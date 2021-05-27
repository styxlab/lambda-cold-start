import { Provider } from "urql";
import { useAllUsersQuery } from "generated/core/graphql";
import { client } from "../graphql/core/client";
import { useState, useEffect } from "react";

interface TimerProps {
  interval: number;
  refetch: () => void;
  set: (val: number) => void;
}

const Timer = ({ interval, refetch, set }: TimerProps) => {
  const [seconds, setSeconds] = useState(interval * 60);
  const min = Math.floor(seconds / 60.0);
  const secs = seconds - min * 60;
  const formattedSecs = ("0" + secs).slice(-2);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds === 0) {
        setSeconds(interval * 60);
        set(Date.now());
        refetch();
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => clearInterval(myInterval);
  });

  return (
    <div>
      <h1>
        {min}:{formattedSecs} minutes until next GraphQL invocation on
        /api/graphql ...
      </h1>
    </div>
  );
};

const Layout = ({ time }: { time: number }) => {
  const [startTime, setStartTime] = useState(time);
  const [{ data, fetching }, refetch] = useAllUsersQuery();
  console.log("before fetching", Date.now());

  if (fetching || !data) return <div>"Loading..."</div>;
  console.log("after fetching", Date.now());
  const duration = (Date.now() - startTime) / 1000;

  return (
    <>
      <div>
        User {data.allUsers[0].name} waited {duration} seconds!
      </div>
      <div>
        {duration > 1 ? (
          <span>
            This is a <b style={{ color: "blue" }}>COLD</b> start :-(
          </span>
        ) : (
          <span>
            This is a <b style={{ color: "red" }}>WARM</b> start :-)
          </span>
        )}
      </div>
      <Timer interval={10} refetch={refetch} set={setStartTime} />
    </>
  );
};

export default function Index() {
  console.log("index", Date.now());
  return (
    <Provider value={client}>
      <Layout time={Date.now()} />
    </Provider>
  );
}
