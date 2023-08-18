import { useCallback, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMessage } from './useMessage';

type UploadUserProps = {
  username: string;
  password: string;
  role: string;
};

export const useRegister = () => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const uploadUser = useCallback(
    (uploadProps: UploadUserProps) => {
      const { username, password, role } = uploadProps;
      setLoading(true);

      axios
        .post('http://localhost:3001/users', { user: { username, password, role } })
        // .post('https://dev.zumens.jp/users', { user: { username, password, role } })
        .then((res) => {
          if (res.data) {
            showMessage({ title: 'ユーザーの登録が完了しました', status: 'success' });
            // window.history.back()
            navigate('/');
          } else {
            showMessage({ title: 'ユーザーの登録に失敗しました', status: 'error' });
          }
          setLoading(false);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data.errors); // これがエラーメッセージの配列
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
          console.log(error.config);
          showMessage({ title: 'ユーザーの登録に失敗しました', status: 'error' });
          setLoading(false);
        });
    },
    [showMessage, navigate]
  );

  return { uploadUser, loading };
};
