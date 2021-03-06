# Change Log

All notable changes to the **keruwawa** project.

Copyright 2016 Sudaraka Wijesinghe <sudaraka@sudaraka.org>

This program comes with ABSOLUTELY NO WARRANTY;
This is free software, and you are welcome to redistribute it and/or modify it
under the terms of the BSD 2-clause License. See the LICENSE file for more
details.

---

## [1.0.2] - 2017-01-13
### Fixed
- UI does not show the current week's data on the graph.

## [1.0.1] - 2016-07-21
### Added
- Add URL to source repository in `package.json` an application footer.
- Show version number in footer.

### Changed
- Changed existing graph colors and added more to the color list.

## [1.0.0] - 2016-07-01
### Added
- `nginx` configuration file.
- `systemd` service file to start HTTP server process.
- `Chart.js` to render work hour data into a chart.
- `moment.js` for date/time processing and formatting.
- `axios` to make API calls from client side.
- Generate HTML page(s) using `html-webpack-plugin`.
- `nodemon` to run and auto-restart development server on file changes.
- ESLint support.
- `webpack` to build web server executable script with ES2015 support.
- `Express` web server framework to host API.
- Query `MySQL` database using `mysql` package.
- Babel support to transpile ES2015 code.
- package.json: `npm` support for task running and package management.
- README, LICENSE and CHANGELOG
