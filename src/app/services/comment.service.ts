import { Injectable } from '@angular/core';
import { Comment } from '../models/comment';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    comments: Comment[] = [];

    getComments() {
        this.comments = localStorage.getItem('comments') === null ? [] : JSON.parse(localStorage.getItem('comments'));
        return this.comments;
    }

    addComment(comment: Comment) {
        this.comments.push(comment);
        const comments = localStorage.getItem('comments') === null ? [] : JSON.parse(localStorage.getItem('comments'));
        comments.push(comment);
        localStorage.setItem('comments', JSON.stringify(comments));
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
        return this.getComments().reduce(function(sum, current) {
            if (current['region']) {
                sum[current['region']] = sum[current['region']] === undefined ? 1 : sum[current['region']] + 1;
            }
            return sum;
        }, {});
    }

    getStatCity(region: string) {
        return this.getComments().reduce(function(sum, current) {
            if (current['region'] === region && current['city']) {
                sum[current['city']] = sum[current['city']] === undefined ? 1 : sum[current['city']] + 1;
            }
            return sum;
        }, {});
    }
}