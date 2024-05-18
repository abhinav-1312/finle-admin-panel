import { Card, CardContent, Typography } from "@mui/material";
interface SummaryCardProps {
  title: string;
  value: any;
  color?: string;
  
}
const SummaryCard1: React.FC<SummaryCardProps> = ({ title, value,color }) => {
  return (
    <Card className="summary-card" style={{ backgroundColor: color }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" style={{ color: "black" }}>{value}</Typography>
      </CardContent>
    </Card>
  );
};

export default SummaryCard1;
