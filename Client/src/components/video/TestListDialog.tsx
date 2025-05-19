import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material"
import { useState } from "react";
import { useDeleteTestMutation, useGetTestsByCourseForTeacherQuery } from "../../redux/slice/api/testApi";
import { IFormInput } from "../../interface/VideoMaterial";
interface TestListDialogProps {
  open: boolean;
  onClose: () => void;
}
interface TestListDialogProps {
  open: boolean;
  onClose: () => void;
  onEditTest: (test: any) => void; // או טיפוס מדויק
}

const TestListDialog = ({ open, onClose, onEditTest }: TestListDialogProps) => {
  const [selectedTest, setSelectedTest] = useState<any | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingTestId, setEditingTestId] = useState<string | null>(null);
  const [openTestDialog, setOpenTestDialog] = useState(false);
  const urlParts = window.location.pathname.split('/');
  const courseName = urlParts[urlParts.length - 1];
  const [deleteTest] = useDeleteTestMutation();
  const { data, refetch } = useGetTestsByCourseForTeacherQuery(courseName);
  const testList = data?.tests ?? [];


const handleDeleteTest = async (testId: string) => {
  try {
    await deleteTest(testId).unwrap();
    await refetch(); // רענון הנתונים
  setSelectedTest(null);
  } catch (error) {
    console.error("Error deleting test:", error);
  }
};


  return (
    <div>
    <Dialog open={open} onClose={() => { onClose(); setSelectedTest(null); }} >
    <DialogTitle>מבחנים בקורס</DialogTitle>
    <DialogContent>
     {selectedTest ? (
      // תצוגת מבחן נבחר
      
      <Box>
        <Typography variant="h6">שם המבחן: {selectedTest.title}</Typography>
        <Typography>תאריך אחרון: {new Date(selectedTest.lastDate).toLocaleString()}</Typography>
        <Typography variant="h6" mt={2}>שאלות:</Typography>
        {selectedTest.questions.map((q: any, idx: number) => (
          <Box key={idx} mb={2} p={1} border={1} borderRadius={2}>
            <Typography>שאלה {idx + 1}: {q.questionText}</Typography>
            {q.options.map((opt: string, i: number) => (
              <Typography key={i} sx={{ ml: 2 }} color={q.correctAnswer === opt ? 'green' : 'inherit'}>
                תשובה {i + 1}: {opt}
              </Typography>
            ))}
            <Typography>הגבלת זמן: {q.timeLimit} שניות</Typography>
          </Box>
        ))}
      </Box>
    ) : (
      // תצוגת רשימת מבחנים
      <Stack spacing={2}>
        {testList.length > 0 ? testList.map((test:IFormInput) => (
          <Card key={test._id} variant="outlined" onClick={() => setSelectedTest(test)} sx={{ cursor: 'pointer' }}>
            <CardContent>
              <Typography variant="h6">{test.TestName}</Typography>
              <Typography>{test.title}</Typography>
         <Button onClick={() => onEditTest(test)}>ערוך</Button>
            </CardContent>
          </Card>
        )) : (
          <Typography>לא נמצאו מבחנים בקורס זה.</Typography>
        )}
      </Stack>
    )}
    <DialogActions>
  {selectedTest ? (
    <Box>
      {/* <Button onClick={() => setSelectedTest(null)} color="primary">חזרה לרשימה</Button> */}
      <Button onClick={() => handleDeleteTest(selectedTest._id)} color="error">מחוק מבחן</Button>
    </Box>
  ) : null}
  <Button onClick={() => { onClose(); setSelectedTest(null); }} color="secondary">סגור</Button>
</DialogActions>
  </DialogContent>
  <DialogActions>
    {selectedTest ? (
      <Button onClick={() => setSelectedTest(null)} color="primary">חזרה לרשימה</Button>
    ) : null}
  </DialogActions>
</Dialog>

</div>
)}

export default TestListDialog
