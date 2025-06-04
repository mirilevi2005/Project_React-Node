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
  DialogActions,
  Card,
  CardContent,
  CardActions,
  LinearProgress,
  Box,
  Alert,
  Paper,
  Divider,
  IconButton,
} from "@mui/material";
import {
  CheckCircle,
  Cancel,
  Timer,
  NavigateNext,
  Close,
} from "@mui/icons-material";
import {
  useGetTestsByCourseQuery,
  useStartTestMutation,
  useSubmitScoreMutation,
} from "../../redux/slice/api/testApi";

// TypeScript Interfaces
export interface Exam {
  _id: string;
  title: string;
  lastDate: string;
  questions: Question[];
  alreadyStarted: boolean;
}

export interface Question {
  _id: string;
  questionText: string;
  options: string[];
  timeLimit: number;
  correctAnswer: string;
}

interface Props {
  courseName: string;
  studentId: string;
}

const TestForStudent = ({ courseName, studentId }: Props) => {
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});
  const [examCompleted, setExamCompleted] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);

  const { data, isLoading, isError } = useGetTestsByCourseQuery({
    courseName,
    studentId,
  });

  const [startTest, { isLoading: isStarting }] = useStartTestMutation();
  const [submitScore, { isLoading: isSubmitting }] = useSubmitScoreMutation();
  
  const exams: Exam[] = data?.tests || [];

  const handleClose = (): void => {
    setSelectedExam(null);
    setCurrentQuestionIndex(0);
    setTimeLeft(0);
    setAnswers({});
    setExamCompleted(false);
    setFeedback(null);
    setScore(null);
  };

  const handleExamClick = async (exam: Exam): Promise<void> => {
    if (exam.alreadyStarted) return;

    try {
      await startTest({ testId: exam._id, studentId }).unwrap();
      setSelectedExam(exam);
      setCurrentQuestionIndex(0);
      setTimeLeft(exam.questions[0].timeLimit);
      setFeedback(null);
    } catch (err) {
      console.error("Error at the beginning of a test:", err);
      alert("Error at the beginning of a test");
    }
  };

  const handleAnswerChange = (questionId: string, answer: string): void => {
    if (!selectedExam || answers[questionId]) return;

    const correctAnswer = selectedExam.questions[currentQuestionIndex].correctAnswer;
    const isCorrect = answer === correctAnswer;

    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    setFeedback(isCorrect ? "correct" : "incorrect");
  };

  const calculateScore = (): number => {
    if (!selectedExam) return 0;
    const totalQuestions = selectedExam.questions.length;
    const pointsPerQuestion = 100 / totalQuestions;
    let correctCount = 0;

    selectedExam.questions.forEach((q) => {
      const selected = answers[q._id];
      if (selected === q.correctAnswer) correctCount++;
    });

    return Math.round(correctCount * pointsPerQuestion);
  };

  const goToNextQuestion = async (): Promise<void> => {
    if (!selectedExam) return;
    setFeedback(null);
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < selectedExam.questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setTimeLeft(selectedExam.questions[nextIndex].timeLimit);
    } else {
      const finalScore = calculateScore();
      setScore(finalScore);
      setExamCompleted(true);

      try {
        await submitScore({
          testId: selectedExam._id,
          studentId,
          score: finalScore,
        }).unwrap();
      } catch (err) {
        console.error("Error sending score:", err);
        alert("Error sending score:");
      }
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = selectedExam 
    ? ((currentQuestionIndex + 1) / selectedExam.questions.length) * 100 
    : 0;

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

  if (selectedExam) {
    return (
      <Dialog 
        open={true} 
        onClose={handleClose} 
        fullWidth 
        maxWidth="md"
        PaperProps={{
          sx: { borderRadius: 2, minHeight: '60vh', bgcolor: '#fafafa' }
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
          <Typography variant="h5" fontWeight="600" color="#2c3e50">
            {selectedExam.title}
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <Close />
          </IconButton>
        </DialogTitle>
        
        <Divider />
        
        <DialogContent sx={{ p: 3, bgcolor: '#fafafa' }}>
          {examCompleted ? (
            <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'white', borderRadius: 2, boxShadow: 1 }}>
              <CheckCircle sx={{ fontSize: 64, mb: 2, color: '#27ae60' }} />
              <Typography variant="h4" fontWeight="600" sx={{ mb: 2, color: '#2c3e50' }}>
The test was successfully completed!              </Typography>
              <Typography variant="h5" sx={{ color: '#34495e' }}>
                Your score:{score}
              </Typography>
            </Paper>
          ) : (
            <Box>
              {/* Progress Bar */}
              <Paper sx={{ p: 2, mb: 3, bgcolor: 'white', borderRadius: 2, boxShadow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" color="#2c3e50" fontWeight="500">
                    question {currentQuestionIndex + 1} מתוך {selectedExam.questions.length}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#3498db' }}>
                    <Timer fontSize="small" />
                    <Typography variant="body2" fontWeight="600">
                      {formatTime(timeLeft)}
                    </Typography>
                  </Box>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={progress} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    bgcolor: '#ecf0f1',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: '#3498db'
                    }
                  }}
                />
              </Paper>

              {/* Question */}
              <Paper sx={{ p: 3, mb: 3, bgcolor: 'white', borderRadius: 2, boxShadow: 1 }}>
                <Typography variant="h6" fontWeight="600" sx={{ mb: 3, color: '#2c3e50' }}>
                  {selectedExam.questions[currentQuestionIndex].questionText}
                </Typography>

                <Alert 
                  severity="info" 
                  sx={{ 
                    mb: 3, 
                    bgcolor: '#e8f4fd', 
                    color: '#2980b9',
                    border: '1px solid #bde0ff'
                  }}
                >
Only one answer can be selected, and it cannot be changed after selection.                </Alert>

                <RadioGroup
                  value={answers[selectedExam.questions[currentQuestionIndex]._id] || ""}
                  onChange={(e) =>
                    handleAnswerChange(
                      selectedExam.questions[currentQuestionIndex]._id,
                      e.target.value
                    )
                  }
                >
                  {selectedExam.questions[currentQuestionIndex].options.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio sx={{ color: '#3498db' }} />}
                      label={
                        <Typography variant="body1" sx={{ py: 0.5, color: '#2c3e50' }}>
                          {option}
                        </Typography>
                      }
                      sx={{
                        margin: 0,
                        p: 1.5,
                        borderRadius: 1,
                        '&:hover': { bgcolor: '#f8f9fa' },
                      }}
                    />
                  ))}
                </RadioGroup>

                {feedback && (
                  <Alert 
                    severity={feedback === "correct" ? "success" : "error"}
                    sx={{ 
                      mt: 2,
                      bgcolor: feedback === "correct" ? '#e8f5e8' : '#ffebee',
                      color: feedback === "correct" ? '#27ae60' : '#e74c3c',
                      border: feedback === "correct" ? '1px solid #c8e6c9' : '1px solid #ffcdd2'
                    }}
                    icon={feedback === "correct" ? <CheckCircle /> : <Cancel />}
                  >
                    {feedback === "correct" ? "Correct answer! ✅" : "Wrong answer ❌"}
                  </Alert>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={goToNextQuestion}
                    disabled={examCompleted || isSubmitting}
                    endIcon={<NavigateNext />}
                    sx={{ 
                      px: 4,
                      bgcolor: '#3498db',
                      '&:hover': { bgcolor: '#2980b9' },
                      borderRadius: 2,
                      fontWeight: '600'
                    }}
                  >
                    {currentQuestionIndex + 1 === selectedExam.questions.length 
                    ? "Finished test" 
: "Next question"
                    }
                  </Button>
                </Box>
              </Paper>
            </Box>
          )}
        </DialogContent>

        {examCompleted && (
          <DialogActions sx={{ p: 3, pt: 0 }}>
            <Button 
              onClick={handleClose} 
              variant="outlined" 
              size="large"
              sx={{ 
                borderColor: '#3498db', 
                color: '#3498db',
                '&:hover': { borderColor: '#2980b9', bgcolor: '#f8f9fa' }
              }}
            >
              closed
            </Button>
          </DialogActions>
        )}
      </Dialog>
    );
  }

  return (
    <Box sx={{ p: 3, bgcolor: '#fafafa', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="600" sx={{ mb: 4, color: '#2c3e50', textAlign: 'center' }}>
Course tests      </Typography>

      {isLoading && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
          <LinearProgress sx={{ width: '100%', mb: 2, bgcolor: '#ecf0f1', '& .MuiLinearProgress-bar': { bgcolor: '#3498db' } }} />
          <Typography color="#7f8c8d">טוען מבחנים...</Typography>
        </Box>
      )}
      
      {isError && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 3, 
            bgcolor: '#ffebee', 
            color: '#e74c3c',
            border: '1px solid #ffcdd2'
          }}
        >
Error loading tests. Please try again later.        </Alert>
      )}

      {!isLoading && !isError && (
        <Stack spacing={3} sx={{ maxWidth: 800, mx: 'auto' }}>
          {exams.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'white', borderRadius: 2, boxShadow: 1 }}>
              <Typography variant="h6" color="#7f8c8d">
No tests are currently available.              </Typography>
            </Paper>
          ) : (
            exams.map((exam) => {
              const currentDate = new Date();
              const finishDate = new Date(exam.lastDate);
              const isExpired = currentDate > finishDate;
              const alreadyStarted = exam.alreadyStarted;

              const getStatusColor = () => {
                if (isExpired) return '#e74c3c';
                if (alreadyStarted) return '#27ae60';
                return '#3498db';
              };

              const getStatusText = () => {
                if (isExpired) return 'expired';
                if (alreadyStarted) return 'Completed';
                return 'available';
              };

              return (
                <Card 
                  key={exam._id} 
                  sx={{ 
                    cursor: isExpired || alreadyStarted ? 'default' : 'pointer',
                    transition: 'all 0.2s ease',
                    bgcolor: 'white',
                    borderRadius: 2,
                    boxShadow: 1,
                    border: `2px solid ${getStatusColor()}`,
                    '&:hover': !isExpired && !alreadyStarted ? {
                      transform: 'translateY(-2px)',
                      boxShadow: 3,
                    } : {},
                  }}
                  onClick={() => !isExpired && !alreadyStarted && handleExamClick(exam)}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="h6" fontWeight="600" color="#2c3e50">
                        {exam.title}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          bgcolor: getStatusColor(),
                          color: 'white',
                          px: 2,
                          py: 1,
                          borderRadius: 2,
                          fontWeight: '600',
                          fontSize: '0.75rem'
                        }}
                      >
                        {getStatusText()}
                      </Typography>
                    </Box>
                    
                    <Typography variant="body2" color="#7f8c8d" sx={{ mb: 1 }}>
                     Last date: {new Date(exam.lastDate).toLocaleDateString('he-IL')}
                    </Typography>
                    
                    <Typography variant="body2" color="#7f8c8d">
                      {exam.questions.length} questions
                    </Typography>
                  </CardContent>
                  
                  {!isExpired && !alreadyStarted && (
                    <CardActions sx={{ justifyContent: 'flex-end', p: 3, pt: 0 }}>
                      <Button 
                        variant="contained" 
                        size="medium"
                        startIcon={<NavigateNext />}
                        disabled={isStarting}
                        sx={{ 
                          bgcolor: '#3498db', 
                          '&:hover': { bgcolor: '#2980b9' },
                          borderRadius: 2,
                          fontWeight: '600'
                        }}
                      >
Start a test
                      </Button>
                    </CardActions>
                  )}
                </Card>
              );
            })
          )}
        </Stack>
      )}
    </Box>
  );
};

export default TestForStudent;

