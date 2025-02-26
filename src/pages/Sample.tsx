import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const postData = [
  {
    id: 1,
    subject: "멜로무비",
  },
  {
    id: 2,
    subject: "넷플릭스",
  },
];

export const Sample = () => {
  return (
    <div>
      {postData.map((id) => {
        return (
          <div>
            Name: {id.id}, Subject: {id.subject}
          </div>
        );
      })}
    </div>
  );
};
