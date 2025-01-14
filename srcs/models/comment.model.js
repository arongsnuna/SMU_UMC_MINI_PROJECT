import mongoose, { Schema } from 'mongoose';

const {
  Types: { ObjectId },
} = Schema;

const CommentSchema = new Schema(
  {
    writer: {
      type: ObjectId,
      required: true,
      ref: 'Student',
    },
    post: {
      type: ObjectId,
      ref: 'post_id',
      required: true,
    },
    text: { type: String, required: [true, '댓글을 작성해주세요'] },
    // 대댓글
    parentComment: {
      type: ObjectId,
      ref: 'comment',
    },
    depth: {
      type: Number,
      default: 1,
    },
    // 고아 댓글 문제 해결을 위해 논리적 삭제 구현을 위해 추가
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  }
);
// 가상 필드는 실제 db에 저장 안된다. 관계형 데이터 처리할 때 유용함

CommentSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'parentComment',
  justOne: false, // 여러 개의 댓글을 가져오기 위해 false로 설정
});

// this binding 때문에 화살표 함수로 하면 안됨
CommentSchema.virtual('childComments')
  .get(function () {
    return this._childComments;
  })
  .set(function (value) {
    this._childComments = value;
  });

export default mongoose.model('Comment', CommentSchema);
