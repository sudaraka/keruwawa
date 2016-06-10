export const

  WEEKLY_ALL = `
  select
    ProjectName,
    DATE_FORMAT(StartTime, '%Y %u') as Week,
    SUM(TIME_TO_SEC(TIMEDIFF(EndTime, StartTime))) as Duration
  from
    sessions as s
  inner join
    projects as p
    on
      p.ProjectId = s.ProjectId
  GROUP BY
    ProjectName,
    Week
  ORDER BY
    Week,
    ProjectName
  `
