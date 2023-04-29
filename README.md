# Bliss App Questions

About
Bliss App Questions is a web application built with Next.js that allows users to search, vote, and share questions or search results. It uses an API endpoint to manage the questions data.


<a href="https://bliss-app-questions.vercel.app/" target="_blank"><img src="/public/images/screen-project.gif" alt="App Preview"/></a>


## Installation
To run the project locally, please follow these steps:

1. Clone the repository:

```
git clone https://github.com/yourusername/bliss-app.gi
```

2. Install the dependencies:
```
npm install
```

3. Start the development server:
```
npm run dev
```

## Usage
Once the server is running, you can access the app at http://localhost:3000/.

## Deployment
To deploy the app, you can run:
```
npm run build
```
This will create a production-ready version of the app, which can be hosted on any server or platform.

Alternatively, you can use Github Codespaces to run the app on a cloud-based development environment. Simply click the "Open with Codespaces" button on the repository's main page, and follow the prompts to set up the environment.

## Try offline features
You can simulate internet connection drop with your brouswer (Google Chrome)
<img src="/public/images/fake-wifi.png" alt="Fake wifi"/>

## Dependencies

Next.js <code> npm create next-app bliss-app --typescript</code>

Axios <code>npm install axios</code>

Sass <code>npm install sass sass-loader --save-dev</code>

Supabase <code>npm install @supabase/supabase-js@latest</code>

## License
This project is licensed under the MIT License. See the LICENSE.md file for details.


## Folder structure

<code>
├── pages/
│   └── details/
│       └── [id].tsx
│   ├── _app.tsx
│   ├── index.tsx
│   ├── questions.tsx
├── components/
│   ├── Button.tsx
│   ├── ConnectionStatus.tsx
│   ├── QuestionItem.tsx
│   ├── ServerStatus.tsx
│   ├── ShareContent.tsx
├── styles/
│   └── global.css
│   └── home.modules.scss
│   └── mixins.scss
│   └── variables.scss
│   └── pages/
│       └── details.scss
│       └── questions.scss
│   └── components/
│       └── Button.scss
│       └── ConnectionStatus.scss
│       └── QuestionItem.scss
│       └── ServerStatus.scss
│       └── ShareContent.scss
├── public/
│   └── images/
├── package.json
├── tsconfig.json
├── next.config.js
└── .env.local
</code>
