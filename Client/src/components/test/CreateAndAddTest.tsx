import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCookies } from "react-cookie";
import {
  useCreateTestMutation,
  useUpdateTestMutation,
} from "../../redux/slice/api/testApi";
import { testSchema, TestFormData } from "../../schema/TestSchama";

interface Props {
  courseName: string;
  refetchTests: () => void;
}

const defaultQuestion = {
  text: "",
  answers: ["", "", "", ""],
  correct: 1,
  timeLimit: 30,
};

const CreateAndAddTest = ({ courseName, refetchTests }: Props) => {
  const [openTestDialog, setOpenTestDialog] = useState(false);
  const [cookies] = useCookies(["token", "userId"]);
  const [createTest] = useCreateTestMutation();
  const [updateTest] = useUpdateTestMutation();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<TestFormData>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      TestName: "",
      LastDate: "",
      questions: [defaultQuestion],
      _id: undefined,
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "questions",
  });

  useEffect(() => {
    if (fields.length === 0) append(defaultQuestion);
  }, [append, fields.length]);

  const addQuestion = () => append(defaultQuestion);

  const onSubmit: SubmitHandler<TestFormData> = async (formData) => {
    const token = cookies.token;
    const userId = cookies.userId;

    if (!token || !userId) {
      console.error("❌ Missing token or user ID");
      return;
    }

    const testData = {
      title: formData.TestName,
      lastDate: formData.LastDate,
      questions: formData.questions.map((q) => ({
        questionText: q.text,
        options: q.answers,
        correctAnswer: q.answers[q.correct - 1], 
        timeLimit: Number(q.timeLimit),
      })),
      teacherId: userId,
      courseName,
    };

    try {
      if (formData._id) {
        await updateTest({ id: formData._id, updatedData: testData }).unwrap();
      } else {
        await createTest(testData).unwrap();
      }
      setOpenTestDialog(false);
      reset();
      refetchTests();
    } catch (err) {
      console.error("❌ Error saving test:", err);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          reset({
            TestName: "",
            LastDate: "",
            questions: [defaultQuestion],
            _id: undefined,
          });
          setOpenTestDialog(true);
        }}
        sx={{ mr: 2 }}
      >
        Create Test
      </Button>

      <Dialog
        open={openTestDialog}
        onClose={() => setOpenTestDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {watch("_id") ? "Edit Test" : "Create New Test"}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField
                label="Test Name"
                {...register("TestName")}
                error={!!errors.TestName}
                helperText={errors.TestName?.message}
                fullWidth
              />
              <TextField
                label="Last Date"
                type="datetime-local"
                {...register("LastDate")}
                error={!!errors.LastDate}
                helperText={errors.LastDate?.message}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <Typography variant="h6">Questions</Typography>
              {fields.map((field, index) => (
                <Box
                  key={field.id}
                  sx={{
                    border: "1px solid #ccc",
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                  }}
                >
                  <TextField
                    label={`Question ${index + 1}`}
                    {...register(`questions.${index}.text`)}
                    error={!!errors.questions?.[index]?.text}
                    helperText={errors.questions?.[index]?.text?.message}
                    fullWidth
                    multiline
                  />
                  {[0, 1, 2, 3].map((i) => (
                    <TextField
                      key={i}
                      label={`Option ${i + 1}`}
                      {...register(`questions.${index}.answers.${i}`)}
                      error={!!errors.questions?.[index]?.answers?.[i]}
                      helperText={
                        errors.questions?.[index]?.answers?.[i]?.message
                      }
                      fullWidth
                      sx={{ mt: 1 }}
                    />
                  ))}
                  <TextField
                    label="Correct Answer Number (1-4)"
                    type="number"
                    {...register(`questions.${index}.correct`, {
                      valueAsNumber: true,
                    })}
                    error={!!errors.questions?.[index]?.correct}
                    helperText={errors.questions?.[index]?.correct?.message}
                    fullWidth
                    sx={{ mt: 1 }}
                  />
                  <TextField
                    label="Time Limit (seconds)"
                    type="number"
                    {...register(`questions.${index}.timeLimit`, {
                      valueAsNumber: true,
                    })}
                    error={!!errors.questions?.[index]?.timeLimit}
                    helperText={errors.questions?.[index]?.timeLimit?.message}
                    fullWidth
                    sx={{ mt: 1 }}
                  />
                </Box>
              ))}
              <Button variant="outlined" onClick={addQuestion}>
                Add Question
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 2 }}
              >
                Save
              </Button>
              <Button
                onClick={() => {
                  setOpenTestDialog(false);
                  reset();
                }}
                color="secondary"
                variant="outlined"
              >
                Close
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CreateAndAddTest;
