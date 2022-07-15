## Recoil Notes
### When to use which: state, hook, util, async

#### Atoms

 - Atom :
	 - use this when state is a **single value instance** (a global theme toggle state) 
	 - does not require any kind of unique ID to be passed to it
 - AtomFamily :
	 - use this when state is a **reused value instance** (a list of all the same type) 
	 - requires a unique ID to be passed to it

#### Selectors

 - Selector : 
	 - **if derived state is from an Atom or another Selector**
	 - use this when deriving/updating state that is **single value instance** (convert temp from F/C)
	 - does not require any kind of unique ID to be passed to it
 - SelectorFamily : 
	 - **if derived state is from a React Component prop, useState, Redux or a combo of Recoil atom/selector &  React Component prop, useState, Redux**
	 - use this when deriving/updating state that is a **reused value instance** (a list of all the same type)
	 - requires a unique ID to be passed to it
 
#### Hooks

 - Read Only
	 - **useRecoilValue** : use this for reading just the GET state of an Atom or Selector
 - Write Only
     - **useSetRecoilState** : use this for writing just the SET state of an Atom or Selector
	 - **useResetRecoilState** : use this to reset the state of an Atom or Selector back to default
 - Read/Write
     - **useSetRecoilState** : use this for reading/writing both the GET/SET state of an Atom or Selector
#### Async
 - Read Only
	 - **useRecoilValueLoadable** : use this for reading just the GET state of an Atom or Selector that is making an api call using async/await
 - Read/Write
     - **useRecoilStateLoadable** : use this for reading/writing both the GET/SET state of an Atom or Selector that is making an api call using async/await