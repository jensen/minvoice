import Card, { CardHeader } from "../components/shared/Card";

export default function Summary() {
  return (
    <main className="page summary__container">
      <Card>
        <CardHeader>Summary</CardHeader>
      </Card>
      <Card />
      <Card />
      <Card />
    </main>
  );
}
