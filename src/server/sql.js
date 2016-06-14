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
