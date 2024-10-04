import React from "react";
import type { Preview } from "@storybook/react";
import { ColorSchemeScript, MantineProvider } from "@mantine/core"
import { theme } from "./../src/lib/theme";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, { parameters }) => {
      return (
        <>
          <head>
            <ColorSchemeScript defaultColorScheme="light" />
          </head>
          <body>
            <MantineProvider defaultColorScheme="light" theme={theme}>
              <Story />
            </MantineProvider>
          </body>
        </>

      )
    }
  ]
};

export default preview;
