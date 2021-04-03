import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

interface LetContext<T> {
    ngVar: T;
}

@Directive({
    selector: '[ngVar]'
})
export class VarDirective<T> {
    private _context: LetContext<T> = {ngVar: null};

    constructor(_viewContainer: ViewContainerRef, _templateRef: TemplateRef<LetContext<T>>) {
        _viewContainer.createEmbeddedView(_templateRef, this._context);
    }

    @Input()
    set ngVar(value: T) {
        this._context.ngVar = value;
    }
}