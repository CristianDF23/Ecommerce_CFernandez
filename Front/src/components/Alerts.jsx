import { Alert } from "flowbite-react";

export function AlertBasic({color, text}) {
  return (
    <Alert color={color} rounded>
      <h2 className="text-xl">{text}</h2>
    </Alert>
  );
}