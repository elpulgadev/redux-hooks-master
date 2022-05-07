Dịch trang: https://react-redux.js.org/api/hooks#useselector-examples

- useSelector
  - Cho phép bạn trích xuất dữ liệu từ state Redux store, sử dụng selector function.
  - \*\*\* selector function phải thuần túy (pure function) vì nó có khả năng được thực thi nhiều lần và tại các thời điểm tùy ý.
  - selector gần tương đương với đối số mapStateToProps để connect về mặt khái niệm. selector sẽ được gọi với toàn bộ state Redux store làm đối số duy nhất của nó. selector sẽ được chạy bất cứ khi nào function component hiển thị (trừ khi tham chiếu của nó không thay đổi kể từ lần hiển thị trước đó của component để kết quả được lưu trong bộ nhớ cache có thể được hook trả về mà không cần chạy lại selector). useSelector () cũng sẽ đăng ký store Redux và chạy selector của bạn bất cứ khi nào một action được thực hiện.
  - Tuy nhiên, có một số khác biệt giữa các selector được chuyển đến useSelector () và một hàm mapState:
    - Kết quả là selector có thể trả về bất kỳ giá trị nào, không chỉ một object. Giá trị trả về của selector sẽ được sử dụng làm giá trị trả về của hook useSelector ().
    - Khi một action được gửi đi, useSelector () sẽ thực hiện reference comparison giữa giá trị kết quả của selector trước đó và giá trị kết quả hiện tại. Nếu chúng khác nhau, component sẽ bị buộc phải render lại. Nếu chúng giống nhau, component sẽ không hiển thị lại.
    - Hàm selector không nhận được đối số ownProps. Tuy nhiên, props có thể được sử dụng thông qua closure (xem các ví dụ bên dưới) ==> tìm hiểu thêm? hoặc bằng cách sử dụng selector cà ri. ==> tìm hiểu thêm?,===> selector cà ri là gì?
    - Cần phải hết sức cẩn thận khi sử dụng selector ghi nhớ (xem ví dụ bên dưới để biết thêm chi tiết). ==> tìm hiểu thêm
    - useSelector () sử dụng strict === reference equality theo mặc định, không phải shallow equality (xem phần sau để biết thêm chi tiết).
  - \*\*\* Có thể xảy ra các trường hợp cạnh khi sử dụng props trong selector có thể gây ra sự cố. Xem phần Cảnh báo Sử dụng của trang này để biết thêm chi tiết. ===> trường hơp cạnh là gì?
  - Bạn có thể gọi useSelector () nhiều lần trong một function component duy nhất. Mỗi cuộc gọi đến useSelector () tạo ra một đăng ký riêng lẻ vào store Redux. Do hành vi trộn cập nhật React được sử dụng trong React Redux v7, một action được gửi đi khiến nhiều useSelector () trong cùng một component trả về các giá trị mới sẽ chỉ dẫn đến một kết xuất lại duy nhất.
- Equality Comparisons and Updates​
  - Khi function component hiển thị, selector function đã cung cấp sẽ được gọi và kết quả của nó sẽ được trả về từ hook useSelector (). (Một kết quả được lưu trong bộ nhớ cache có thể được trả về bởi hook mà không cần chạy lại selector nếu đó là tham chiếu hàm giống như trên kết xuất trước đó của component.)
  - Tuy nhiên, khi một action được gửi đến store Redux, useSelector () chỉ buộc render lại nếu kết quả của selector có vẻ khác với kết quả cuối cùng. So sánh mặc định là so sánh strict === reference equality. Điều này khác với connect (), sử dụng shallow equality check trên kết quả của các lệnh gọi mapState để xác định xem có cần render lại hay không. Điều này có một số hàm ý về cách bạn nên sử dụng useSelector ().
  - Với mapState, tất cả các trường riêng lẻ được trả về trong một object kết hợp. Không quan trọng nếu object trả về có phải là một tham chiếu mới hay không - connect () chỉ so sánh các trường riêng lẻ. Với useSelector (), việc trả về một object mới mỗi lần sẽ luôn buộc render lại theo mặc định. Nếu bạn muốn truy xuất nhiều giá trị từ store, bạn có thể:
    - Gọi useSelector () nhiều lần, với mỗi cuộc gọi trả về một giá trị trường duy nhất
    - Sử dụng Reselect hoặc một thư viện tương tự để tạo selector được ghi nhớ trả về nhiều giá trị trong một object, nhưng chỉ trả về một object mới khi một trong các giá trị đã thay đổi. ==> có thể tìm hiểu thêm
    - Sử dụng hàm shallowEqual từ React-Redux làm đối số EqualFn để useSelector (), như:
      import { shallowEqual, useSelector } from 'react-redux'
      const selectedData = useSelector(selectorReturningObject, shallowEqual)
      ==> có thể tìm hiểu thêm
    - function so sánh tùy chọn cũng cho phép sử dụng một cái gì đó như khả năng so sánh \_.isEqual () của Lodash hoặc Immutable.js.
      ==> có thể tìm hiểu thêm
- Using memoizing selectors​ ==> không sử dụng nhiều ==> có thể tìm hiểu sau
  - Khi sử dụng useSelector với selector nội tuyến như được render ở trên, một phiên bản mới của selector được tạo bất cứ khi nào component được render. Điều này hoạt động miễn là selector không duy trì bất kỳ state nào. Tuy nhiên, các bộ memoizing selector (ví dụ: được tạo qua createSelector từ việc chọn lại) có state bên trong và do đó cần phải cẩn thận khi sử dụng chúng. Dưới đây, bạn có thể tìm thấy các tình huống sử dụng điển hình cho các memoizing selector.
*** với việc dùng useSelector, đương nhiên rằng việc bạn trả về 1 object mới thì nó sẽ re-render lại rồi. vậy đừng nên trả về trong useSelector một object. thay vào đó bạn hãy thử:
  - dùng nhiều useSelector cho riêng các selector muốn sử dụng.
  - dùng reselect hoặc tự viết 1 lib ra để quản lý state dạng này.
  - dùng shallowEqual như một function truyền vào tham số thứ 2 của useSelector => mục đích cuối cùng cũng như việc tương tự bạn sử dụng _.isEqual() hoặc Immutable.js để so sánh
- useDispatch
  - const dispatch = useDispatch()
  - Hook này trả về một tham chiếu đến dispatch function từ Redux store. Bạn có thể sử dụng nó để gửi các action khi cần thiết.
  - Examples
    import React form 'react';
      import { useDispatch } from 'react-redux';

      export const CounterComponent = ({ value }) => {
        const dispatch = useDispatch();

        return (
          <div>
            <span>{value}</span>
            <button onClick={() => dispatch({ type: 'increament-counter' })}>Increment counter</button>
          </div>
        );
      }
  - Khi chuyển một callback bằng cách sử dụng dispath tới một component con, đôi khi bạn có thể muốn ghi nhớ nó bằng useCallback. Nếu component con đang cố gắng tối ưu hóa hành vi render bằng cách sử dụng React.memo () hoặc tương tự, điều này sẽ tránh render không cần thiết các thành phần con do tham chiếu callback đã thay đổi.


Note trang: https://www.youtube.com/watch?v=N_J3blGHI0w

- Sự khác nhau giữa 2 cách dùng useSelector:
  - Cách 1:
    - const hobbyList = useSelector(state => state.hobby.list);
    - const activeId = useSelector(state => state.hobby.activeId);
  - Cách 2:
    - const hobbyState = useSelector(state => ({
      list: state.hobby.list,
      activeId: state.hobby.activeId
      }));
    - const hobbyState = useSelector(state => ({
      list: state.hobby.list,
      activeId: state.hobby.activeId
      }), shallowEqual);
- strict comparison ===
  - Lấy giá trị cũ và giá trị mới so sánh với nhau, nếu khác nhau ==> fasle
  - string, number ==> so sánh giá trị và kiểu dữ liệu
  - object ==> so sánh địa chỉ
- shallow comparison
  - object ==> đi qua từng key của object ==> so sánh
