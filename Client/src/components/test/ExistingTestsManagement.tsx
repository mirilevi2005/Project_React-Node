import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  useGetTestsByCourseForTeacherQuery,
  useDeleteTestMutation,
  useLazyGetTestScoresQuery,
} from "../../redux/slice/api/testApi";
import { RootState } from "../../redux/store";
import { setSelectedGrades } from "../../redux/slice/testSlice";
import { StudentScore } from "../../interface/Exam";

interface TestType {
  _id: string;
  title: string;
  lastDate: string;
}

interface Props {
  courseName: string;
  openFormForEdit: (testData: any) => void;
}

const ExistingTestsManagement = ({ courseName, openFormForEdit }: Props) => {
  const dispatch = useDispatch();
  const selectedGrades = useSelector((state: RootState) => state.tests.selectedGrades);
  const [openTestsDialog, setOpenTestsDialog] = useState(false);
  const [openGradesDialog, setOpenGradesDialog] = useState(false);
  const { data: testsData, refetch } = useGetTestsByCourseForTeacherQuery(courseName);
  const testList: TestType[] = testsData?.tests ?? [];
  const [deleteTest] = useDeleteTestMutation();
  const [triggerGetTestScores] = useLazyGetTestScoresQuery();

  const handleDeleteTest = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this test?")) {
      try {
        await deleteTest(id).unwrap();
        refetch();
      } catch (error) {
        console.error("❌ Error deleting test:", error);
      }
    }
  };

  const handleOpenGradesDialog = async () => {
    const grades: { [testId: string]: StudentScore[] } = {};
    for (const test of testList) {
      try {
        const response = await triggerGetTestScores(test._id).unwrap();
        grades[test._id] = response.scores ?? [];
      } catch (error) {
        console.error("❌ Error loading scores:", error);
        grades[test._id] = [];
      }
    }
    dispatch(setSelectedGrades(grades));
    setOpenGradesDialog(true);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Button variant="outlined" onClick={() => setOpenTestsDialog(true)} sx={{ mr: 2 }}>
        Manage Existing Tests
      </Button>
      <Button variant="outlined" onClick={handleOpenGradesDialog}>
        Show Scores
      </Button>

      <Dialog open={openTestsDialog} onClose={() => setOpenTestsDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Existing Tests in Course: {courseName}</DialogTitle>
        <DialogContent>
          {testList.length === 0 ? (
            <Typography>No tests available</Typography>
          ) : (
            <List>
              {testList.map((test) => (
                <ListItem
                  key={test._id}
                  secondaryAction={
                    <>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => {
                          openFormForEdit({
                            TestName: test.title,
                            LastDate: test.lastDate,
                            questions: [],
                            _id: test._id,
                          });
                          setOpenTestsDialog(false);
                        }}
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDeleteTest(test._id)}
                      >
                        Delete
                      </Button>
                    </>
                  }
                >
                  <ListItemText
                    primary={test.title}
                    secondary={`Deadline: ${new Date(test.lastDate).toLocaleString()}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={openGradesDialog} onClose={() => setOpenGradesDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Student Scores</DialogTitle>
        <DialogContent>
          {Object.keys(selectedGrades).length === 0 ? (
            <Typography>No scores to display</Typography>
          ) : (
            Object.entries(selectedGrades).map(([testId, scores]) => (
              <Box key={testId} sx={{ mb: 3 }}>
                <Typography variant="h6">
                  Test: {testList.find((t) => t._id === testId)?.title ?? "Unknown"}
                </Typography>
                {scores.length === 0 ? (
                  <Typography>No scores for this test</Typography>
                ) : (
                  <List>
                    {scores.map((score) => (
                      <ListItem key={score.studentId}>
                        <ListItemText
                          primary={score.userName}
                          secondary={`Score: ${score.score} | Finished: ${
                            score.finishedAt ? new Date(score.finishedAt).toLocaleString() : "-"
                          }`}
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
            ))
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ExistingTestsManagement;
