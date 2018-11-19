import { Injectable } from '@angular/core';
import { Comment } from '../models/comment';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    comments: Comment[] = [];

    constructor() {
    }

    getComments() {
        if (localStorage.getItem('comments') === null) {
            this.comments = [];
        } else {
            this.comments = JSON.parse(localStorage.getItem('comments'));
        }
        return this.comments;
    }

    addComment(comment: Comment) {
        this.comments.push(comment);
        this.comments.push(comment);
        let comments = [];
        if (localStorage.getItem('comments') === null) {
            comments = [];
            comments.push(comment);
            localStorage.setItem('comments', JSON.stringify(comments));
        } else {
            comments = JSON.parse(localStorage.getItem('comments'));
            comments.push(comment);
            localStorage.setItem('comments', JSON.stringify(comments));
        }
    }

    deleteComment(comment: Comment) {
        for (let i = 0; i < this.comments.length; i++) {
            if (comment == this.comments[i]) {
                this.comments.splice(i, 1);
                localStorage.setItem('comments', JSON.stringify(this.comments));
            }
        }
    }

    getStatRegions() {
        const comments = this.getComments();

        const result = comments.reduce(function(sum, current) {
            if (current['region']) {
                sum[current['region']] = sum[current['region']] === undefined ? 1 : sum[current['region']] + 1;
            }
            return sum;
        }, {});
        return result;
    }

    getStatCity(region: string) {
        const comments = this.getComments();
        const result = comments.reduce(function(sum, current) {
            if (current['region'] === region && current['city']) {
                sum[current['city']] = sum[current['city']] === undefined ? 1 : sum[current['city']] + 1;
            }
            return sum;
        }, {});
        return result;
    }
}
