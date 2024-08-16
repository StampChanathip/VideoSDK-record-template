import React, { useMemo } from "react";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import { MeetingContainer } from "./components/MeetingContainer";

export default function App() {
  const { meetingId, token} = useMemo(() => {
    const location = window.location;

    const urlParams = new URLSearchParams(location.search);

    const paramKeys = {
      meetingId: "meetingId",
      token: "token",
    };

    Object.keys(paramKeys).forEach((key) => {
      paramKeys[key] = urlParams.get(key)
        ? decodeURIComponent(urlParams.get(key))
        : null;
    });

    return paramKeys;
  }, []);

  return meetingId && token ? (
    <div>
      <MeetingProvider
        config={{
          meetingId,
          micEnabled: false,
          webcamEnabled: false,
          name: "recorder",
        }}
        token={token}
        joinWithoutUserInteraction
      >
        <MeetingContainer />
      </MeetingProvider>
    </div>
  ) : null;
}
