import { List, Avatar, Rate } from 'antd';

const ReviewList = ({ reviews }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={reviews}
      renderItem={review => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar>{review.user.name[0]}</Avatar>}
            title={<span>{review.user.name} - <Rate disabled value={review.rating} /></span>}
            description={review.comment}
          />
        </List.Item>
      )}
    />
  );
};

export default ReviewList;
