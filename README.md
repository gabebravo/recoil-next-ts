## Recoil Notes

## Async Selectors vs Atom Effects

1. **Async Selectors** : the whole idea for Selectors is that for the same inputs, you should always get back the same outputs.
   - This means that if the data from your api changed during the session, the user will not see the updated data because the selector has no way of knowing it has changed.
   - Thus, Async Selectors are not meant to be used for fetching data that may change in the lifetime of the application.
   - Rather they are meant for deriving one bit of state from another bit of state, it and assumes the derivation will always give you back the same result.
   - The only way to do this is by using an intermediate selector. Basically, manually changing the state of an atom arbitrarily to then trigger a new call. But that's kind of hacky.

- **RECOMMENDATION :** Use Async Selectors when you need to fetch some state asynchronously and you know that state **IS NOT** going to change given the same input params

2. **Atom Effects** : the whole idea for Async Selectors is that you don't assume that the same inputs will always give you back the same outputs.
- **RECOMMENDATION :** Use Async Selectors when you need to fetch some state asynchronously and you know that state **IS** going to change given the same input params

### When to use which: state, hook, util, async

#### Atoms

- Atom :
  - use this when state is a **single value instance** (a global theme toggle state)
  - does not require any kind of unique ID to be passed to it
- AtomFamily :
  - use this when state is a **reused value instance** (a list of all the same type)
  - requires a unique ID to be passed to it
- Atom Concepts -- - Atom Effects : these are used to send data upstream to the remote source (persists data to the DB). They have a set of functions that will get called anytime the value of the atom changes. - Atom Effect **trick for logging** :
  `export const shoppingListState = atom<ItemType[]>({ key: 'shoppingList', default: [], effects_UNSTABLE: [ ({ onSet }) => { onSet((newShoppingList) => { // logs anytime atom state changes. newShoppingList = updated version console.log('newShoppingList', newShoppingList); }); }, ], });`

##

#### Selectors

- Selector :
  - **if derived state is from an Atom or another Selector**
  - use this when deriving/updating state that is **single value instance** (convert temp from F/C)
  - does not require any kind of unique ID to be passed to it
- SelectorFamily :
  - **if derived state is from a React Component prop, useState, Redux or a combo of Recoil atom/selector & React Component prop, useState, Redux**
  - use this when deriving/updating state that is a **reused value instance** (a list of all the same type)
  - requires a unique ID to be passed to it
  - see syntax below : selectorFamily type = 2args <returnType, argsPassedIn>
  - see syntax below : setter uses a function and a callback. The first func args are the callable setter, and the second are the selectors : ({path, id}) => ({get, set}, newValue) =>

```
export const editProperty = selectorFamily<any, {path: string; id: number}>({
   key: 'someKey',
   get: ({path, id}) => ({get}) => {
       ...
   },
   set: ({path, id}) => ({get, set}, newValue) => {
       ...
       set(elementState(id), newElement)
   },
})
```

- Selector Concepts :
  - Intermediate Selectors : An "intermediate selector" is used to control when the data fetching happens. The use-case is if you have an event triggering an api call every time something happens. This would cause tons of api calls. But if you instead have that selector listen for a change in the "intermediate selector", and then only run if that value changes. The trigger will still cause the "intermediate selector" to run, but if its value hasn't changed, it won't update, so the main selector won't get triggered. **Learn Recoil : intermediate selector video (6:20 - 9:20)**.

```
const imageIdState = selector({
   key: 'imageId',
   get: ({get}) => {
       const id = get(selectedElementState)
       if (!id) return
       return get(elementState(id)).image?.id
   },
})

const imageInfoState = selector({
   key: 'imageInfo',
   get: ({get}) => {
       const imageId = get(imageIdState)
       if (!imageId) return
       return callApi('image-details', {queryParams: {seed: imageId}})
   },
})
```

- Selector Composition : Learn Recoil video tutorial shows how to break up components for efficiency and specific use-cases

```
export const editProperty = selectorFamily<any, {path: string; id: number}>({
   key: 'editProperty',
   get: ({path, id}) => ({get}) => {
       const element = get(elementState(id))
       return _.get(element, path)
   },
   set: ({path, id}) => ({get, set}, newValue) => {
       const element = get(elementState(id))
       const newElement = produce(element, (draft) => {
           _.set(draft, path, newValue)
       })
       set(elementState(id), newElement)
   },
})

const editSize = selectorFamily<any, {dimension: 'width' | 'height'; id: number}>({
   key: 'editSize',
   get: ({dimension, id}) => ({get}) => {
       return get(editProperty({path: `style.size.${dimension}`, id}))
   },
   set: ({dimension, id}) => ({get, set}, newValue) => {
       const hasImage = get(editProperty({path: 'image', id})) !== undefined
       if (!hasImage) {
           set(editProperty({path: `style.size.${dimension}`, id}), newValue)
           return
       }
       const {width, height} = get(editProperty({path: 'style.size', id}))
       const aspectRatio = width / height
       if (dimension === 'width') {
           set(editProperty({path: 'style.size', id}), {
               width: newValue,
               height: Math.round(newValue / aspectRatio),
           })
       } else {
           set(editProperty({path: 'style.size', id}), {
               height: newValue,
               width: Math.round(newValue * aspectRatio),
           })
       }
   },
})
```

**When to use Writeable Selectors in RecoilJS :**
https://dev.to/yoniweisbrod/when-to-use-writeable-selectors-in-recoiljs-45b2

##

#### Hooks

- Read Only
  - **useRecoilValue** : use this for reading just the GET state of an Atom or Selector
- Write Only
  - **useSetRecoilState** : use this for writing just the SET state of an Atom or Selector
  - **useResetRecoilState** : use this to reset the state of an Atom or Selector back to default
- Read/Write
  - **useSetRecoilState** : use this for reading/writing both the GET/SET state of an Atom or Selector

##

#### Async

- Read Only
  - **useRecoilValueLoadable** : use this for reading just the GET state of an Atom or Selector that is making an api call using async/await
- Read/Write
  - **useRecoilStateLoadable** : use this for reading/writing both the GET/SET state of an Atom or Selector that is making an api call using async/await

##

### Links

**Manage React State with Recoil :**
https://egghead.io/courses/manage-react-state-with-recoil-fe987643

**Simplify Your App with Recoil :**
https://www.webiny.com/blog/simplifying-your-application-state-management-with-Recoil

**Manage Your App State with Recoil :**
https://ljn-it.medium.com/how-to-manage-your-react-application-state-with-recoil-js-part-1-2-e6f101fd724d

##
