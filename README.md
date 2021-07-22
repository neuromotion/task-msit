# MSIT Task

<p style="float: left">
  <img src="msit.svg" width="200" alt="MSIT Icon"/>
</p>

[![Actions Status](https://github.com/brown-ccv/task-msit/workflows/Test%2C%20Build%2C%20and%20Package/badge.svg)](https://github.com/brown-ccv/task-msit/actions)
[![Actions Status](https://github.com/brown-ccv/task-msit/workflows/Build%20at%20home%20version%20%28Windows%29/badge.svg)](https://github.com/brown-ccv/task-msit/actions)

This repo contains the MSIT task. It is a [jspsych](https://www.jspsych.org/) task built with React and Electron. This
task uses [Honeycomb](https://brown-ccv.github.io/honeycomb-docs/) (also known as Neuro Task Starter).

## Getting Started

1. Clone this repo onto your computer

```
git clone https://github.com/brown-ccv/task-msit.git
```

2. Change directory into the new folder

```
cd task-<TASK NAME>
```

3. Set the remote url to your tasks' repo (create a github repo if not yet created)

```
git remote set-url origin <PATH_TO_YOUR_REPO>
```

4. Install the dependencies (the -D flag installs the dev dependencies as well as the production ones)

```
npm install -D
```

5. Run the task in dev mode - this should launch an electron window with the task with the inspector open to the console
   and will hot-reload when changes are made to the app

```
npm run dev
```

6. Check out the data - the data is saved throughout the task to the users's app directory. This is logged at the
   beginning of the task wherever you ran `npm run dev`

## Participant-specific experiment configuration

The default experiment configuration settings can be found in `src/config/config.json`. In order to override them for a
specific participant, create a new file named `<participant_id>-config.json` in a folder named `msit-settings` in the
local machine's `Desktop` folder.