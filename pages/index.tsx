import { Provider } from "urql";
import { useAllUsersQuery } from "generated/core/graphql";
import { client } from "../graphql/core/client";

const Layout = ({ time }: { time: number }) => {
  const [{ data, fetching }] = useAllUsersQuery();
  console.log("before fetching", Date.now());
  if (fetching || !data) return <div>"Loading..."</div>;
  console.log("after fetching", Date.now());
  const duration = (Date.now() - time) / 1000;
  return (
    <>
      <div>
        User {data.allUsers[0].name} waited {duration} seconds!
      </div>
      <div>
        {duration > 1 ? (
          <span>
            This is a <b>COLD</b> start :-(
          </span>
        ) : (
          <span>
            This is a <b>WARM</b> start :-)
          </span>
        )}
      </div>
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
