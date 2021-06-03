import { useState, useEffect } from "react";

const Layout = ({ t0 }: { t0: number }) => {
  const [result, setResult] = useState({ duration: 0 });
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("/api/echo", {
      headers: {
        "x-time-0": `${Date.now()}`,
      },
    })
      .then((response) => response.text())
      .then((result) => setMessage(result));
  }, []);

  useEffect(() => {
    fetch(`/api/prisma`, {
      headers: {
        "x-time-0": `${Date.now()}`,
      },
    })
      .then((result) => result.json())
      .then((result) => setResult(result));
  }, []);

  if (!message || result.duration === 0) return <div>"Loading..."</div>;
  const echoDelay = +message;
  const coldDelay = result.duration - echoDelay;

  return (
    <>
      <div>Echo Query: {echoDelay} ms</div>
      <div>Prisma Query: {result.duration} ms</div>
      <div>Cold Start Delay: {coldDelay} ms</div>
      <br />
      <div>
        {coldDelay > 1000 ? (
          <span>
            This is a <b style={{ color: "blue" }}>COLD</b> start :-(
          </span>
        ) : (
          <span>
            This is a <b style={{ color: "red" }}>WARM</b> start :-)
          </span>
        )}
      </div>
    </>
  );
};

export default function Index() {
  return <Layout t0={Date.now()} />;
}

//interface TimerProps {
//  interval: number;
//  refetch: () => void;
//  set: (val: number) => void;
//}

//const Timer = ({ interval, refetch, set }: TimerProps) => {
//  const [seconds, setSeconds] = useState(interval * 60);
//  const min = Math.floor(seconds / 60.0);
//  const secs = seconds - min * 60;
//  const formattedSecs = ("0" + secs).slice(-2);
//
//  useEffect(() => {
//    let myInterval = setInterval(() => {
//      if (seconds === 0) {
//        setSeconds(interval * 60);
//        set(Date.now());
//        refetch();
//      } else {
//        setSeconds(seconds - 1);
//      }
//    }, 1000);
//    return () => clearInterval(myInterval);
//  });
//
//  return (
//    <div>
//      <h1>
//        {min}:{formattedSecs} minutes until next GraphQL invocation on
//        /api/graphql ...
//      </h1>
//    </div>
//  );
//};
