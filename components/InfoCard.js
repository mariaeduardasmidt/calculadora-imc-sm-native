import { Card } from "react-native-paper";

export default function InfoCard({ image, title, titleStyle, children, buttonLabel,
  buttonPress, ...props }) {

  return (
    <Card {...props}>
      {children && <Card.Content>{children}</Card.Content>}
      <Card.Actions>
      </Card.Actions>
    </Card>
  );
}