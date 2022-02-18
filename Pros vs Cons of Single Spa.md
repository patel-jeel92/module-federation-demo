Pros vs Cons of Single Spa

[Single SPA]:
Pros:
- Configurable in terms of import maps. (Just have to change the json file and layout file to add new micro apps)
- Works with all popular front end frameworks

Cons:
- Less community support
- Getting it loaded in Global Nav needs work 
- All other micro apps need to be single spa aware and need to be configured In such a way

[Module Federation]:
Pros:
- No third party library to rely on. Webpack 5 has wide support from community 
- Teams are already using module federation. Can easily be added 
- Works with all popular front end frameworks
- Ability to expose parts of the app or the full app itself (widgets vs full app)
- Easier to load it in Global Nav

Cons:
- The shell and navigation won’t be as configurable as single spa 
