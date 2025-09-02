import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article, NewsResponse } from 'src/app/interfaces/article.interface';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private base = environment.newsApiBase;
  private apiKey = environment.newsApiKey;

  constructor(private http: HttpClient) {}

  getTopHeadlines(category?: string, country = 'us'): Observable<Article[]> {
    let params = new HttpParams()
      .set('country', country)
      .set('apiKey', this.apiKey);

    if (category) {
      params = params.set('category', category);
    }

    return this.http.get<NewsResponse>(`${this.base}/top-headlines`, { params })
      .pipe(map(r => r.articles));
  }

  getRandomNews(limit = 5): Observable<Article[]> {
    return this.getTopHeadlines().pipe(
      map(list => list.sort(() => 0.5 - Math.random()).slice(0, limit))
    );
  }

  search(query: string): Observable<Article[]> {
    const params = new HttpParams()
      .set('q', query)
      .set('apiKey', this.apiKey);

    return this.http.get<NewsResponse>(`${this.base}/everything`, { params })
      .pipe(map(r => r.articles));
  }
}
