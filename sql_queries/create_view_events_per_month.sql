CREATE VIEW detect_count_by_month as select DATE_TRUNC('month',start_date) as month ,count(gid) as detections from tb_fire_atlas_detections group by DATE_TRUNC('month',start_date);