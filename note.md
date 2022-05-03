Dịch trang: https://react-redux.js.org/api/hooks#useselector-examples

- useSelector
	- Cho phép bạn trích xuất dữ liệu từ state lưu trữ Redux, sử dụng selector function.
	- *** selector function phải thuần túy (pure function) vì nó có khả năng được thực thi nhiều lần và tại các thời điểm tùy ý.
	- selector gần tương đương với đối số mapStateToProps để connect về mặt khái niệm. selector sẽ được gọi với toàn bộ state cửa hàng Redux làm đối số duy nhất của nó. selector sẽ được chạy bất cứ khi nào function component hiển thị (trừ khi tham chiếu của nó không thay đổi kể từ lần hiển thị trước đó của component để kết quả được lưu trong bộ nhớ cache có thể được hook trả về mà không cần chạy lại selector). useSelector () cũng sẽ đăng ký cửa hàng Redux và chạy selector của bạn bất cứ khi nào một hành động được thực hiện.
	- Tuy nhiên, có một số khác biệt giữa các selector được chuyển đến useSelector () và một hàm mapState:
		- Kết quả là selector có thể trả về bất kỳ giá trị nào, không chỉ một object. Giá trị trả về của selector sẽ được sử dụng làm giá trị trả về của hook useSelector ().
		- Khi một action được gửi đi, useSelector () sẽ thực hiện so sánh tham chiếu giữa giá trị kết quả của selector trước đó và giá trị kết quả hiện tại. Nếu chúng khác nhau, component sẽ bị buộc phải render lại. Nếu chúng giống nhau, component sẽ không hiển thị lại.
		- Hàm selector không nhận được đối số ownProps. Tuy nhiên, props có thể được sử dụng thông qua closure (xem các ví dụ bên dưới) hoặc bằng cách sử dụng selector cà ri. ===> selector cà ri là gì?
		- Cần phải hết sức cẩn thận khi sử dụng selector ghi nhớ (xem ví dụ bên dưới để biết thêm chi tiết). ==> tìm hiểu thêm
		- useSelector () sử dụng kiểm tra bình đẳng tham chiếu nghiêm ngặt === theo mặc định, không phải bình đẳng nông (xem phần sau để biết thêm chi tiết).
	- *** Có thể xảy ra các trường hợp cạnh khi sử dụng props trong selector có thể gây ra sự cố. Xem phần Cảnh báo Sử dụng của trang này để biết thêm chi tiết. ===> trường hơp cạnh là gì?
	- Bạn có thể gọi useSelector () nhiều lần trong một function component duy nhất. Mỗi cuộc gọi đến useSelector () tạo ra một đăng ký riêng lẻ vào store Redux. Do hành vi trộn cập nhật React được sử dụng trong React Redux v7, một hành động được gửi đi khiến nhiều useSelector () trong cùng một component trả về các giá trị mới sẽ chỉ dẫn đến một kết xuất lại duy nhất.
- Equality Comparisons and Updates​
	- Khi function component hiển thị, selector function đã cung cấp sẽ được gọi và kết quả của nó sẽ được trả về từ hook useSelector (). (Một kết quả được lưu trong bộ nhớ cache có thể được trả về bởi hook mà không cần chạy lại selector nếu đó là tham chiếu hàm giống như trên kết xuất trước đó của component.)
	- Tuy nhiên, khi một hành động được gửi đến store Redux, useSelector () chỉ buộc render lại nếu kết quả của selector có vẻ khác với kết quả cuối cùng. So sánh mặc định là so sánh tham chiếu === nghiêm ngặt. Điều này khác với connect (), sử dụng shallow equality check trên kết quả của các lệnh gọi mapState để xác định xem có cần render lại hay không. Điều này có một số hàm ý về cách bạn nên sử dụng useSelector ().
	- Với mapState, tất cả các trường riêng lẻ được trả về trong một object kết hợp. Không quan trọng nếu object trả về có phải là một tham chiếu mới hay không - connect () chỉ so sánh các trường riêng lẻ. Với useSelector (), việc trả về một object mới mỗi lần sẽ luôn buộc render lại theo mặc định. Nếu bạn muốn truy xuất nhiều giá trị từ store, bạn có thể:
		- Gọi useSelector () nhiều lần, với mỗi cuộc gọi trả về một giá trị trường duy nhất
		- Sử dụng Reselect hoặc một thư viện tương tự để tạo selector được ghi nhớ trả về nhiều giá trị trong một object, nhưng chỉ trả về một object mới khi một trong các giá trị đã thay đổi. ==> có thể tìm hiểu thêm
		- Sử dụng hàm shallowEqual từ React-Redux làm đối số EqualFn để useSelector (), như:
			import { shallowEqual, useSelector } from 'react-redux'
			const selectedData = useSelector(selectorReturningObject, shallowEqual)
			==> có thể tìm hiểu thêm
		- function so sánh tùy chọn cũng cho phép sử dụng một cái gì đó như khả năng so sánh _.isEqual () của Lodash hoặc Immutable.js.
			==> có thể tìm hiểu thêm

--------------------------------------------------------------------------------------------

Note trang: https://www.youtube.com/watch?v=N_J3blGHI0w

- Sự khác nhau giữa 2 cách dùng useSelector:
	- Cách 1:
		- const hobbyList = useSelector(state => state.hobby.list);
		-	const activeId = useSelector(state => state.hobby.activeId);
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