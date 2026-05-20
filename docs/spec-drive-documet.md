# Spec: NXTWAVE Dynamic Form

## Assumptions I'm Making
1. We are using pure Vanilla JS, HTML, and CSS without build tools or frameworks (no React, no Webpack/Vite unless specified).
2. We assume the use of a simple local server to serve the files (like VS Code Live Server) to allow `fetch('data/questions.json')` without CORS policies blocking the `file://` protocol.
3. The aesthetic is modern, matching the NXTWAVE brand (dark themes, bold typography, high contrast), based on the reference site.
4. "Ponderated" means we will count the frequency of each chosen "type" to determine the dominant personality type of the user.

## Objective
Build a dynamic, interactive form matching the NXTWAVE brand style using Vanilla JS, HTML, and CSS. The specific flow is:
1. Greet the user and ask for their name.
2. Click "Start".
3. Show questions from `questions.json` one at a time with smooth, user-friendly animations.
4. Tally the chosen answers into four categories: Creators, Solvers, Protectors, Communicators.
5. Display the winning category in an emotional, euphoric way using specific colors and symbols:
   - **Communicators**: Green (mic, flag, tripod)
   - **Protectors**: Yellow (stethoscope, constitution, uniform)
   - **Solvers**: Blue (calculator, robot, computer)
   - **Creators**: Red (brushes, iPad, book, chef's hat, mockup)

## Tech Stack
- Frontend: HTML5, CSS3, Vanilla JavaScript (ES6)
- Data format: JSON
- Recommended local server: Standard Live Server (to serve static files).

## Commands
*Since this is a vanilla JS setup without a bundler, traditional build commands are minimal.*
- Dev: `npx serve .` or use the VS Code Live Server extension.
- Run tests: Manual browser testing.

## Project Structure
```text
/
├── index.html          → Main entry point structure
├── style.css           → Styles and animations
├── app.js              → Form logic, transitions, and state management
├── data/
│   └── questions.json  → Extracted questions and answer mapping
└── docs/
    └── spec-drive-documet.md → This specification
```

## Code Style
Clean, semantic HTML, modular CSS (with CSS variables for colors), and modern Vanilla JS using modules and `async/await`.

```js
// Example JS
async function loadQuestions() {
  const response = await fetch('./data/questions.json');
  const data = await response.json();
  return data;
}

function showNextQuestion(questionIndex) {
  const questionContainer = document.getElementById('question-container');
  // Transition logic
  questionContainer.classList.add('fade-in');
}
```

## Testing Strategy
- Manual E2E testing in browser (Chrome/Safari).
- Network throttling tests to ensure JSON loads gracefully.
- Mobile responsiveness using Chrome DevTools device mode.

## Boundaries
- **Always do:** Smooth transitions between questions; use semantic HTML elements to ensure accessibility; handle data loading asynchronously.
- **Ask first:** Adding third-party libraries (e.g., Lottie for confetti, GSAP for animations) instead of CSS-only animations.
- **Never do:** Expose hardcoded logic that blocks the UI; mutate the original DOM clumsily without transition classes.

## Success Criteria
- [ ] User can enter their name and start the form.
- [ ] Questions flow sequentially with smooth visual transitions (no jarring page reloads).
- [ ] Form correctly loads and renders questions from `questions.json`.
- [ ] Tallying logic accurately calculates the max frequent type based on user selections.
- [ ] Result screen correctly maps color and symbols to the winning type (Green/Yellow/Blue/Red).
- [ ] Final result screen feels emotional and euphoric.
- [ ] Styling strictly matches the modern aesthetic of NXTWAVE.

## Open Questions
1. Do you want to use a tool/library like `canvas-confetti` for the euphoric ending, or strictly stick to CSS animations?
2. Are you using a bundler (like Vite) or strictly serving index.html natively?
3. Should ties in the final tally be resolved in a specific way (e.g. prioritize one over another)?