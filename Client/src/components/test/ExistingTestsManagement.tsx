// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   List,
//   ListItem,
//   ListItemText,
//   Typography,
// } from "@mui/material";
// import {
//   useGetTestsByCourseForTeacherQuery,
//   useDeleteTestMutation,
//   useLazyGetTestScoresQuery,
// } from "../../redux/slice/api/testApi";

// interface StudentScore {
//   studentId: string;
//   userName: string;
//   score: number;
//   finishedAt?: string;
// }

// interface TestType {
//   _id: string;
//   title: string;
//   lastDate: string;
// }

// interface ExistingTestsManagementProps {
//   courseName: string;
//   openFormForEdit: (testData: any) => void;
// }

// const ExistingTestsManagement: React.FC<ExistingTestsManagementProps> = ({
//   courseName,
//   openFormForEdit,
// }) => {
//   const [openTestsDialog, setOpenTestsDialog] = useState(false);
//   const [openGradesDialog, setOpenGradesDialog] = useState(false);
//   const [selectedGrades, setSelectedGrades] = useState<{
//     [testId: string]: StudentScore[];
//   }>({});

//   const { data: testsData, refetch } = useGetTestsByCourseForTeacherQuery(courseName);
//   const testList: TestType[] = testsData?.tests ?? [];

//   const [deleteTest] = useDeleteTestMutation();
//   const [triggerGetTestScores] = useLazyGetTestScoresQuery();

//   const handleDeleteTest = async (id: string) => {
//     if (window.confirm("האם את בטוחה שברצונך למחוק את המבחן?")) {
//       try {
//         await deleteTest(id).unwrap();
//         refetch();
//       } catch (error) {
//         console.error("❌ שגיאה במחיקת מבחן:", error);
//       }
//     }
//   };

//   const handleOpenGradesDialog = async () => {
//     const grades: { [testId: string]: StudentScore[] } = {};

//     for (const test of testList) {
//       try {
//         const response = await triggerGetTestScores(test._id).unwrap();
//         grades[test._id] = response.scores ?? [];
//       } catch (error) {
//         console.error("❌ שגיאה בטעינת ציונים:", error);
//         grades[test._id] = [];
//       }
//     }

//     setSelectedGrades(grades);
//     setOpenGradesDialog(true);
//   };

//   return (
//     <Box sx={{ p: 2 }}>
//       <Button variant="outlined" onClick={() => setOpenTestsDialog(true)} sx={{ mr: 2 }}>
//         ניהול מבחנים קיימים
//       </Button>
//       <Button variant="outlined" onClick={handleOpenGradesDialog}>
//         הצג ציונים
//       </Button>

//       <Dialog
//         open={openTestsDialog}
//         onClose={() => setOpenTestsDialog(false)}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>מבחנים קיימים בקורס: {courseName}</DialogTitle>
//         <DialogContent>
//           {testList.length === 0 ? (
//             <Typography>אין מבחנים קיימים</Typography>
//           ) : (
//             <List>
//               {testList.map((test) => (
//                 <ListItem
//                   key={test._id}
//                   secondaryAction={
//                     <>
//                       <Button
//                         size="small"
//                         color="primary"
//                         onClick={() => {
//                           openFormForEdit({
//                             TestName: test.title,
//                             LastDate: test.lastDate,
//                             questions: [], // תצטרך למלא אם רוצים לערוך שאלות
//                             _id: test._id,
//                           });
//                           setOpenTestsDialog(false);
//                         }}
//                         sx={{ mr: 1 }}
//                       >
//                         עריכה
//                       </Button>
//                       <Button
//                         size="small"
//                         color="error"
//                         onClick={() => handleDeleteTest(test._id)}
//                       >
//                         מחיקה
//                       </Button>
//                     </>
//                   }
//                 >
//                   <ListItemText
//                     primary={test.title}
//                     secondary={`תאריך אחרון: ${new Date(test.lastDate).toLocaleString()}`}
//                   />
//                 </ListItem>
//               ))}
//             </List>
//           )}
//         </DialogContent>
//       </Dialog>

//       <Dialog
//         open={openGradesDialog}
//         onClose={() => setOpenGradesDialog(false)}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>ציוני תלמידים</DialogTitle>
//         <DialogContent>
//           {Object.keys(selectedGrades).length === 0 ? (
//             <Typography>אין ציונים להצגה</Typography>
//           ) : (
//             Object.entries(selectedGrades).map(([testId, scores]) => (
//               <Box key={testId} sx={{ mb: 3 }}>
//                 <Typography variant="h6">
//                   מבחן: {testList.find((t) => t._id === testId)?.title ?? "לא ידוע"}
//                 </Typography>
//                 {scores.length === 0 ? (
//                   <Typography>אין ציונים למבחן זה</Typography>
//                 ) : (
//                   <List>
//                     {scores.map((score) => (
//                       <ListItem key={score.studentId}>
//                         <ListItemText
//                           primary={score.userName}
//                           secondary={`ציון: ${score.score} | סיום: ${
//                             score.finishedAt
//                               ? new Date(score.finishedAt).toLocaleString()
//                               : "-"
//                           }`}
//                         />
//                       </ListItem>
//                     ))}
//                   </List>
//                 )}
//               </Box>
//             ))
//           )}
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// };

// export default ExistingTestsManagement;















import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Dialog, DialogContent, DialogTitle, List, ListItem, ListItemText, Typography,} from "@mui/material";
import { useGetTestsByCourseForTeacherQuery, useDeleteTestMutation, useLazyGetTestScoresQuery,
} from "../../redux/slice/api/testApi";
import { RootState } from "../../redux/store"; // נתיב לפי הפרויקט שלך
import { setSelectedGrades } from "../../redux/slice/testSlice"; // נתיב לפי הסלייס שלך
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

const ExistingTestsManagement = ({courseName,openFormForEdit}:Props) => {
  const dispatch = useDispatch();
  const selectedGrades = useSelector((state: RootState) => state.tests.selectedGrades);
  const [openTestsDialog, setOpenTestsDialog] = useState(false);
  const [openGradesDialog, setOpenGradesDialog] = useState(false);
  const { data: testsData, refetch } = useGetTestsByCourseForTeacherQuery(courseName);
  const testList: TestType[] = testsData?.tests ?? [];
  const [deleteTest] = useDeleteTestMutation();
  const [triggerGetTestScores] = useLazyGetTestScoresQuery();
  const handleDeleteTest = async (id: string) => {
    if (window.confirm("האם את בטוחה שברצונך למחוק את המבחן?")) {
      try {
        await deleteTest(id).unwrap();
        refetch();
      } catch (error) {
        console.error("❌ שגיאה במחיקת מבחן:", error);
      }
    }
  };

  const handleOpenGradesDialog = async () => {
    const grades: { [testId: string]: StudentScore[] } = {};
    for (const test of testList) {
      try {
        const response = await triggerGetTestScores(test._id).unwrap();
        grades[test._id] = response.scores ?? [];
    //    grades[test._id] = response.map((item): StudentScore => ({
    //   studentId: item.studentId,
    //   userName: item.studentName ?? "", // ברירת מחדל אם אין studentName
    //   scores: item.scores,
    //  finishedAt: item.submittedAt,     // העתקת submittedAt ל־finishedAt
    //   }));
        console.log("✅ response:", response);
      } catch (error) {
        console.error("❌ שגיאה בטעינת ציונים:", error);
        grades[test._id] = [];
      }
    }
    dispatch(setSelectedGrades(grades)); 
    setOpenGradesDialog(true);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Button variant="outlined" onClick={() => setOpenTestsDialog(true)} sx={{ mr: 2 }}>
        ניהול מבחנים קיימים
      </Button>
      <Button variant="outlined" onClick={handleOpenGradesDialog}>
        הצג ציונים
      </Button>

      <Dialog
        open={openTestsDialog}
        onClose={() => setOpenTestsDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>מבחנים קיימים בקורס: {courseName}</DialogTitle>
        <DialogContent>
          {testList.length === 0 ? (
            <Typography>אין מבחנים קיימים</Typography>
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
                            questions: [], // תצטרך למלא אם רוצים לערוך שאלות
                            _id: test._id,
                          });
                          setOpenTestsDialog(false);
                        }}
                        sx={{ mr: 1 }}
                      >
                        עריכה
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDeleteTest(test._id)}
                      >
                        מחיקה
                      </Button>
                    </>
                  }
                >
                  <ListItemText
                    primary={test.title}
                    secondary={`תאריך אחרון: ${new Date(test.lastDate).toLocaleString()}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={openGradesDialog}
        onClose={() => setOpenGradesDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>ציוני תלמידים</DialogTitle>
        <DialogContent>
          {Object.keys(selectedGrades).length === 0 ? (
            <Typography>אין ציונים להצגה</Typography>
          ) : (
            Object.entries(selectedGrades).map(([testId, scores]) => (
              <Box key={testId} sx={{ mb: 3 }}>
                <Typography variant="h6">
                  מבחן: {testList.find((t) => t._id === testId)?.title ?? "לא ידוע"}
                </Typography>
                {scores.length === 0 ? (
                  <Typography>אין ציונים למבחן זה</Typography>
                ) : (
                  <List>
                    {scores.map((score) => (
                      <ListItem key={score.studentId}>
                        <ListItemText
                          primary={score.userName}
                          secondary={`ציון: ${score.scores} | סיום: ${
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

