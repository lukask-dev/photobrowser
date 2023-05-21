# Instructions
You can try the live version of the project [here](https://lukask-dev.github.io/photobrowser/).

#### Keyboard Shortcuts
- Thumbnail view: Arrow keys right/left for next/previous page
- Photo view: Esc to close

# Future Outlook
Within the time I had scheduled for the task, I focused on creating an app that meets the requirements specified and feels good when using it, while also learning the framework (my first React app).
Here are some features and known issues that I would take care of with the perspective of developing this further and for a larger-scale application:

#### Usability
- Better mobile support (scale thumbnails to two items beside each other)
- Change CSS to be relative to screen dimensions instead of using px
- Button to scroll to the top of the page
- Photo view: Buttons for going to next/previous photo
- Handle more network errors and display them in a nicer way

#### Implementation
- Better validation for page and photo parameters passed via the url
- Thumbnail view: Possibly pre-loading previous and next page images in the background
- Caching image titles so that the photo view does not need to load it again
- Check for unnecessary renders

#### Developer-friendliness
- Convert the project to TypeScript
- Move component-specific CSS to separate files



