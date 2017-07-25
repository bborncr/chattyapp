# REACT Notes
## First Steps
- Create basic HTML template
- Break page down into components
    - Header
    - Series
    - Post
- Hierarchy
    - App
        - Header
        - Main
            - PostSeries
                - Post
                - ...
## Props & State
A React component **CANNOT** change its props

A React component **CAN** change its own state

## Component LifeCycle
- Create
    - **constructor**
    - componentWillMount
    - **render**
    - **componentDidMount**
- Update
    - componentWillReceiveProps
    - shouldComponentUpdate
    - componentWillUpdate
    - **render**
    - componentDidUpdate
- Destroy
    - componentWillUnmount
### Mounting
- set initial state
- default props
### setState <=> render
- Do not modify state directly
    - **NO** this.state.posts = [];
    - **YES** this.setState({ posts: []}); Triggers re-render
- State updates are **merged**
- State updates may be asynchronous.
## Flow of Data
- One Way
- `props` flow downhill
- `props` can be functions, these functions can be used to send data upstream
`<button onCLick={ this.onPost}></button>`
## Jensen has a checklist
