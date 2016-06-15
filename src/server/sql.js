/**
 * src/server/sql.js: common place for SQL statements used by the server
 *
 * Copyright 2016 Sudaraka Wijesinghe <sudaraka@sudaraka.org>
 *
 * This program comes with ABSOLUTELY NO WARRANTY
 * This is free software, and you are welcome to redistribute it and/or modify
 * it under the terms of the BSD 2-clause License. See the LICENSE file for more
 * details.
 *
 */

export const

  WEEKLY_ALL = `
  select
    ProjectName as project,
    CAST(DATE_FORMAT(StartTime, '%Y') as INT) as year,
    CAST(DATE_FORMAT(StartTime, '%u') as INT) as week,
    SUM(TIME_TO_SEC(TIMEDIFF(EndTime, StartTime))) as duration
  from
    sessions as s
  inner join
    projects as p
    on
      p.ProjectId = s.ProjectId
      and DATE_FORMAT(StartTime, '%Y') in (?)
  GROUP BY
    ProjectName,
    year,
    week
  ORDER BY
    year,
    week,
    ProjectName
  `
