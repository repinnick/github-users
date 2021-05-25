import { EMPTY, fromEvent } from "rxjs";
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  mergeMap,
  tap,
  catchError,
  filter,
} from "rxjs/operators";
import { ajax } from "rxjs/ajax";

const url = "https://api.github.com/search/users?q=";
const $search = document.getElementById("search");
const $result = document.getElementById("result");

const stream$ = fromEvent($search, "input").pipe(
  map((event) => event.target.value),
  debounceTime(1000), // задержка
  distinctUntilChanged(), // изменения, которые не создают новый запрос
  tap(() => ($result.innerHTML = "")),
  filter((value) => value.trim()),
  switchMap((value) =>
    ajax.getJSON(url + value).pipe(catchError((error) => EMPTY))
  ),
  map((response) => response.items),
  mergeMap((items) => items)
);

stream$.subscribe(
  (user) => {
    const html = `
    <div class="card">
        <div class="card-image">
            <img src="${user.avatar_url}" alt="">
            <span class="card-title">${user.login}</span>
        </div>
        <div class="card-action">
            <a href="${user.html_url}" target="_blank">Open GitHub</a>
        </div>
    </div>`;
    $result.insertAdjacentHTML("beforeend", html);
  },
  (error) => console.log(error.message)
);
