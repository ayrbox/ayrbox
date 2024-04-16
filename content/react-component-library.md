# React Component Library

Lets build full blown react component library. There are lots of examples and article for creating component library and I guess, this is one of the all.
We will build component library based on bootstrap but no css or js will be used from bootstrap. The idea would be use bootstrap as Design System and build components based on the design.
It will be very similar to projects like reactstrap and reactbootstrap except that its written in typescript and for learning about typescript and building something.


## Tech Stack
We will use following stack to create our component library.

- React
- React Hooks
- Typescript
- Typestyle


## React 
React is unarguable one of the most popular library to write UI.

## React Hooks
Even typescript use classes and promotes OOP paradigm. For me it make sense of funtioncal paradigm although having OOP background. In that case, Hooks make a complete sense where I can write component in purely functional way. React Hooks allows us write custom hooks that give more power as resuing and sharing code.


## Typescript

Typescript because we are creating a libray for other developer (including self) to use. Having typed component helps developer required check documentation less as the editor provide you instant feedback about type error or type of arugument or return type. For current instant, I am refering to VSCode. 

## Typestyle
Almost any css-in-js works with typescript like emotion and styled and other. But `typestyle` is chosen because it itself is writting in typescript so it make sense to use it for the component library. 


## Plan
Create custom theme provider that is aligned with Design Sytem. Create separate components based on design system that follows theme paradigm.

Compile components using `tsdx` or `rollup` that use obvious `webpack` under the hood.

Separate project for docs using `gatsbyjs` with mdx. This is because will generate the static site that will be hosted in github pages.

Playground a react project that is used for testing in `create-react-app` and/or other configuration.

All the projects will be maintained in monorepo. `yarn` and `lerna` will be used to maintain the project.

