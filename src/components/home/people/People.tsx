import Title from "@/components/panel/Title";
import { Frame } from "@/components/panel/downShadowFrame";
import { useEffect } from "react";
import PersonItem from "./PersonItem";
import { Person } from "@/types/tableType";

interface Props {
  gotPeople: any[];
}

const People = (props: Props) => {
  useEffect(() => {
    console.log("gotPeople", props.gotPeople);
  }, []);

  return (
    <div>
      <Title title="容疑者" />
      <Frame>
        {props.gotPeople.map((person: Person) => (
          <PersonItem
            key={person.id}
            person={person}
          />
        ))}
      </Frame>
    </div>
  );
};

export default People;
