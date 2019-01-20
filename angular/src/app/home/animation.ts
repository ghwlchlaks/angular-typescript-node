import {
    state,
    trigger,
    transition,
    style,
    query,
    animate,
    group
} from '@angular/animations';

export const slideInAnimation =
trigger('openClose', [
    transition('open => closed', group([
        query('.jumbotron', [
            style({
                'height': '100vh',
                'background-size' : 'cover'
            }),
            animate('1s', style({
                'height': '10vh',
                'width' : '100%'
            }))
        ]),
        query('.container', [
            style({
                'padding-top': '25%',
                'padding-left': '15%',
                'padding-right': '15%'
            }),
            animate('1s', style({
                'padding-top': '1%',
                'padding-left': '1%',
                'padding-right': '1%'
            }))
        ])
    ])),
]);


