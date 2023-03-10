# @AutoDestroy decorator 🔥

This is the source code for the `@AutoDestroy` property decorator. The main purpose of this decorator is to automatically destroy subscriptions in Angular components. This only works on a `Subject<void>` variable.

If you want to test it check it out on [StackBlitz ⚡️](https://stackblitz.com/edit/auto-destroy).

## Example of usage

Create property decorator `@AutoDestroy`:

```js
export function AutoDestroy(component: any, key: string | symbol): void {
  const originalOnDestroy = component.ngOnDestroy;

  component.ngOnDestroy = function () {
    if (originalOnDestroy) {
      originalOnDestroy.call(this);
    }
    this[key].next();
    this[key].complete();
  };
}
```

Use it in component like this (no need to add `ngOnDestroy()`):

```js
@Component(...)
export class AppComponent {
  @AutoDestroy destroy$: Subject<void> = new Subject<void>();
}
```
