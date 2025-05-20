import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AggregatedScore {
  testTitle: string;
  averageScore: number;
}

interface Props {
  aggregatedScores: AggregatedScore[];
}

const CourseScoresChart = ({ aggregatedScores }: Props) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={aggregatedScores}>
      <XAxis dataKey="testTitle" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="averageScore" stroke="#3f51b5" />
    </LineChart>
  </ResponsiveContainer>
);

export default CourseScoresChart;
