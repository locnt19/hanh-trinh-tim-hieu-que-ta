$(document).ready(function () {
  $('#table_users').DataTable({
    responsive: true,
    order: [],
    columnDefs: [{ orderable: false, targets: [0] }]
  });
  $('#table_baithi').DataTable({
    responsive: true,
    order: [],
    columnDefs: [{ orderable: false, targets: [0] }]
  });
  $('#table_xephang_users').DataTable({
    responsive: true,
    order: [[2, "desc"]],
    columnDefs: [{ orderable: false, targets: [0] }]
  });
  $('#table_section1_list').DataTable();
  $('#table_section2_list').DataTable();
  $('#table_section3_list').DataTable();
  $('#table_section4_list').DataTable();
  $('#table_section2_hinhnen_list').DataTable({
    order: [],
    columnDefs: [{ orderable: false, targets: [0, 1] }]
  });
});
