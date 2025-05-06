# Micro App Demo

This is a micro frontend application that demonstrates the integration with the VSS Frontend host application.

## Features

The micro app includes two main features:

1. **Product Management**: List, view, and edit products
2. **Customer Management**: List, view, and edit customers

## Getting Started

### Prerequisites

- Node.js 16+
- npm 7+

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:

```bash
npm start
```

The micro app will be available at `http://localhost:3001`.

### Production Build

To build the micro app for production:

```bash
npm run build
```

The build output will be in the `dist` directory.

## Integration with Host App

The micro app integrates with the host app through the following mechanisms:

1. **Mount/Unmount Interface**: The micro app exposes `mount` and `unmount` functions in the global scope.
2. **Authentication**: The micro app receives authentication state from the host app and listens for changes.
3. **Event Communication**: The micro app uses the event bus provided by the host app to communicate with it.

### Integration Details

#### Global Registration

The micro app registers itself in the global scope using the following pattern:

```javascript
window.micro_app_demo = {
  mount: (container, props) => { /* ... */ },
  unmount: (container) => { /* ... */ }
};
```

#### Mount Function

The `mount` function is called by the host app when it wants to render the micro app. It receives:

- `container`: The DOM element where the micro app should be rendered
- `props`: An object containing:
  - `basePath`: The base path for routing
  - `authState`: The authentication state from the host app
  - `eventBus`: The event bus for communication

#### Unmount Function

The `unmount` function is called by the host app when it wants to remove the micro app from the DOM.

#### Manifest File

The micro app provides a `manifest.json` file that describes its assets:

```json
{
  "name": "micro-app-demo",
  "version": "0.1.0",
  "scripts": [
    "http://localhost:3001/static/js/main.js",
    "http://localhost:3001/main.js"
  ],
  "styles": [
    "http://localhost:3001/static/css/main.css",
    "http://localhost:3001/main.css"
  ]
}
```

#### Webpack Configuration

The webpack configuration is set up to expose the micro app as a global variable:

```javascript
output: {
  // ...
  library: {
    name: 'micro_app_demo',
    type: 'window',
    export: 'default',
  },
}
```

## Project Structure

```
micro-app-demo/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   ├── data/
│   │   └── mockData.ts
│   ├── features/
│   │   ├── products/
│   │   │   ├── ProductList.tsx
│   │   │   ├── ProductDetail.tsx
│   │   │   └── ProductForm.tsx
│   │   └── customers/
│   │       ├── CustomerList.tsx
│   │       ├── CustomerDetail.tsx
│   │       └── CustomerForm.tsx
│   ├── types/
│   │   ├── auth.ts
│   │   └── features.ts
│   ├── App.tsx
│   ├── bootstrap.tsx
│   ├── index.css
│   └── index.tsx
├── package.json
├── tsconfig.json
├── webpack.config.js
├── postcss.config.js
└── tailwind.config.js
```

## Technologies Used

- React 18
- TypeScript
- React Router for navigation
- Ant Design for UI components
- Tailwind CSS for styling
- Webpack for bundling

## License

This project is licensed under the MIT License.
