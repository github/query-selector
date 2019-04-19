import {query, querySelectorAll, closest, getAttribute, namedItem} from "../index";

const bodyElement1 = query(document, 'body');
const bodyElement2 = query(document, 'body', HTMLBodyElement);
const bodyElement3 = query<HTMLBodyElement>(document, 'body');
const bodyElement4 = query<HTMLBodyElement>(document, 'body', HTMLBodyElement);

const formElements1 = querySelectorAll(bodyElement1, '.js-comment-form');
const formElements2 = querySelectorAll(bodyElement2, '.js-comment-form', HTMLFormElement);
const formElements3 = querySelectorAll<HTMLFormElement>(bodyElement3, '.js-comment-form');
const formElements4 = querySelectorAll<HTMLFormElement>(bodyElement4, '.js-comment-form', HTMLFormElement);

const htmlElement1 = closest(bodyElement1, 'html');
const htmlElement2 = closest(bodyElement2, 'html', HTMLHtmlElement);
const htmlElement3 = closest<HTMLHtmlElement>(bodyElement3, 'html');
const htmlElement4 = closest<HTMLHtmlElement>(bodyElement4, 'html', HTMLHtmlElement);

const bodyThing = getAttribute(bodyElement1, 'data-things');

const commentForm = formElements3[0];

const usernameField = namedItem(commentForm, 'username');
const nameField = namedItem(commentForm, 'name', HTMLInputElement);
const emailField = namedItem<HTMLInputElement>(commentForm, 'email', HTMLInputElement);
const mailinglistsField = namedItem<RadioNodeList>(commentForm, 'mailinglists', RadioNodeList);
const locationField = namedItem<HTMLSelectElement>(commentForm, 'location', HTMLSelectElement);

// Test that default types are indeed inferred properly
const typedBody1: HTMLElement = bodyElement1;
const typedBody2: HTMLBodyElement = bodyElement2;
const typedFormElements2: Array<HTMLFormElement> = formElements2;
const typedHtmlElement1: HTMLElement = htmlElement1;
const typedHtmlElement2: HTMLHtmlElement = htmlElement2;
const typeUsernameField: HTMLInputElement = usernameField;
const typedNameField: HTMLInputElement = nameField;
