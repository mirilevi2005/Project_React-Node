import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  Stack,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import {
  useGetTestsByCourseQuery,
  useStartTestMutation,
} from "../../redux/slice/api/testApi";
import { Exam } from "../../interface/Exam";

interface Props {
  courseName: string;
  studentId: string;
}

 const TestForStudent = ({ courseName, studentId }: Props) => {
// const TestForStudent = ({ courseName }: Props) => {

  const [open, setOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});
  const [examCompleted, setExamCompleted] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);

  const { data, isLoading, isError } = useGetTestsByCourseQuery(courseName);
  const [startTest] = useStartTestMutation();

  const exams: Exam[] = data?.tests || [];

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setSelectedExam(null);
    setCurrentQuestionIndex(0);
    setTimeLeft(0);
    setAnswers({});
    setExamCompleted(false);
    setFeedback(null);
    setScore(null);
  };

  const handleExamClick = async (exam: Exam) => {
    if (exam.alreadyStarted) return;

    try {
      await startTest({ testId: exam._id, studentId }).unwrap();

      setSelectedExam(exam);
      setCurrentQuestionIndex(0);
      setTimeLeft(exam.questions[0].timeLimit);
      setFeedback(null);
    } catch (err) {
      console.error("שגיאה בתחילת מבחן:", err);
      alert("שגיאה בטעינת המבחן");
    }
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    if (!selectedExam || answers[questionId]) return;

    const correctAnswer = selectedExam.questions[currentQuestionIndex].correctAnswer;
    const isCorrect = answer === correctAnswer;

    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    setFeedback(isCorrect ? "תשובה נכונה ✅" : "תשובה שגויה ❌");
  };

  const goToNextQuestion = () => {
    if (!selectedExam) return;
    setFeedback(null);
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < selectedExam.questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setTimeLeft(selectedExam.questions[nextIndex].timeLimit);
    } else {
      calculateScore();
      setExamCompleted(true);
    }
  };

  const calculateScore = () => {
    if (!selectedExam) return;
    const totalQuestions = selectedExam.questions.length;
    const pointsPerQuestion = 100 / totalQuestions;
    let correctCount = 0;

    selectedExam.questions.forEach((q) => {
      const selected = answers[q._id];
      if (selected === q.correctAnswer) correctCount++;
    });

    setScore(correctCount * pointsPerQuestion);
  };

  useEffect(() => {
    if (examCompleted || !selectedExam) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          goToNextQuestion();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, selectedExam, examCompleted]);

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        לצפייה במבחנים בקורס זה
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>מבחני הקורס</DialogTitle>
        <DialogContent>
          {isLoading && <Typography>טוען מבחנים...</Typography>}
          {isError && <Typography>שגיאה בטעינת מבחנים</Typography>}

          {!selectedExam ? (
            <Stack spacing={2} mt={2}>
              {exams.map((exam) => {
                const currentDate = new Date();
                const finishDate = new Date(exam.lastDate);
                const isExpired = currentDate > finishDate;
                const alreadyStarted = exam.alreadyStarted;

                return (
                  <Button
                    key={exam._id}
                    variant="outlined"
                    fullWidth
                    color={
                      isExpired
                        ? "secondary"
                        : alreadyStarted
                        ? "info"
                        : "success"
                    }
                    disabled={isExpired || alreadyStarted}
                    onClick={() => handleExamClick(exam)}
                  >
                    {exam.title}{" "}
                    {isExpired
                      ? "— תם הזמן"
                      : alreadyStarted
                      ? "— המבחן נבדק"
                      : ""}
                  </Button>
                );
              })}
            </Stack>
          ) : examCompleted ? (
            <Typography variant="h5" textAlign="center" mt={4}>
              ✅ המבחן הסתיים. הציון שלך: {score}
            </Typography>
          ) : (
            <>
              <Typography>⏳ זמן שנותר: {timeLeft} שניות</Typography>
              <Typography>
                ניתן לבחור תשובה אחת בלבד, ולא ניתן לשנות לאחר הבחירה
              </Typography>
              <Typography mt={2}>
                שאלה {currentQuestionIndex + 1} מתוך {selectedExam.questions.length}
              </Typography>
              <Typography mt={1} fontWeight="bold">
                {selectedExam.questions[currentQuestionIndex].questionText}
              </Typography>

              <RadioGroup
                value={
                  answers[selectedExam.questions[currentQuestionIndex]._id] || ""
                }
                onChange={(e) =>
                  handleAnswerChange(
                    selectedExam.questions[currentQuestionIndex]._id,
                    e.target.value
                  )
                }
              >
                {selectedExam.questions[currentQuestionIndex].options.map(
                  (option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  )
                )}
              </RadioGroup>

              {feedback && (
                <Typography
                  color={feedback.includes("נכונה") ? "green" : "red"}
                  mt={1}
                >
                  {feedback}
                </Typography>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={goToNextQuestion}
                disabled={examCompleted}
                sx={{ mt: 2 }}
              >
                לשאלה הבאה
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestForStudent;