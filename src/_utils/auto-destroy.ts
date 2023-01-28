// Property decorator to automatically destroy subscriptions - this only works on a Subject<void> variable
export function AutoDestroy(component: any, key: string | symbol): void {
  const originalOnDestroy = component.ngOnDestroy;

  // override ngOnDestroy() in component
  component.ngOnDestroy = function () {
    // check if in the component already exist ngOnDestroy() - if so, call it
    if (originalOnDestroy) {
      originalOnDestroy.call(this);
    }
    // unsubscribe in ngOnDestroy()
    this[key].next();
    this[key].complete();
    // remove console.log - just example to show how this is working
    console.log('%cDESTROY SECOND COMPONENT', 'color: #33ffe6');
  };
}
