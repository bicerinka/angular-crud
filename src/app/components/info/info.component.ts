import {Component, OnInit} from '@angular/core';
import {Comment} from '../../models/comment';
import {CommentService} from '../../services/comment.service';

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    // styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
    comments: Comment[];

    constructor(private comment: CommentService) {
    }

    ngOnInit() {
        this.comments = this.comment.getComments();
    }

    deleteComment(comment: Comment) {
        if (confirm('Вы действительно хотите удалить этот комментарий?')) {
            this.comment.deleteComment(comment);
        }
    }

}
