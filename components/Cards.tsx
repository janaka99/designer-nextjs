import React, { useEffect, useState } from "react";
import Card from "./Card";
import SkelatonCard from "./SkelatonCard";

const Cards = () => {
  const [projects, setprojects] = useState([]);

  const getProjects = async () => {
    try {
      const res = await fetch("/api/project/all", {
        method: "GET",
      });
      const newRes = await res.json();

      if (res.ok) {
        console.log(newRes);
        if (
          newRes.length <= 0 ||
          !newRes.length ||
          newRes === undefined ||
          newRes === null
        ) {
          getProjects();
        }
        setprojects(newRes);
      } else {
        getProjects();
        console.log("error raised");
      }
    } catch (error) {}
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className="mt-20 lg:mt-0 max-w-[1580px] w-[95%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-7 lg:grid-cols-3 xl:grid-cols-4">
      {projects.length === 0 ? (
        <>
          <SkelatonCard key={1} />
          <SkelatonCard key={2} />
          <SkelatonCard key={3} />
          <SkelatonCard key={4} />
          <SkelatonCard key={5} />
          <SkelatonCard key={6} />
        </>
      ) : (
        projects.map((project: any) => (
          <Card key={project._id} project={project} />
        ))
      )}
    </div>
  );
};

export default Cards;
