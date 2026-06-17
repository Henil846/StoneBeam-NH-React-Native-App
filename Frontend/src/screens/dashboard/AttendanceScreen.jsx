import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../../context/AppContext';
import CardWrapper from '../../components/common/CardWrapper';
import StatusBadge from '../../components/common/StatusBadge';
import PrimaryButton from '../../components/common/PrimaryButton';
import { MOCK_ATTENDANCE } from '../../constants/mockData';
import Typography from '../../constants/typography';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const AttendanceScreen = ({ navigation }) => {
  const { colors } = useApp();
  const insets = useSafeAreaInsets();
  const [checkedIn, setCheckedIn] = useState(false);

  // Generate calendar grid for current month
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const presentDays = MOCK_ATTENDANCE.filter((a) => a.status === 'Present').length;
  const absentDays = MOCK_ATTENDANCE.filter((a) => a.status === 'Absent').length;
  const halfDays = MOCK_ATTENDANCE.filter((a) => a.status === 'Half Day').length;

  const getStatusForDay = (day) => {
    const att = MOCK_ATTENDANCE.find((a) => {
      const d = new Date(a.date);
      return d.getDate() === day;
    });
    return att?.status || null;
  };

  const dotColor = (status) => {
    if (status === 'Present') return colors.success;
    if (status === 'Absent') return colors.error;
    if (status === 'Half Day') return colors.warning;
    return 'transparent';
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={[styles.header, { paddingTop: insets.top + 10, backgroundColor: colors.card }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Attendance</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Calendar */}
        <CardWrapper style={styles.calendarCard}>
          <Text style={[styles.monthTitle, { color: colors.textPrimary }]}>
            {now.toLocaleString('default', { month: 'long' })} {year}
          </Text>
          <View style={styles.dayHeaders}>
            {DAYS.map((d) => (
              <Text key={d} style={[styles.dayHeader, { color: colors.textSecondary }]}>{d}</Text>
            ))}
          </View>
          <View style={styles.calendarGrid}>
            {Array.from({ length: firstDay }, (_, i) => (
              <View key={`empty_${i}`} style={styles.calendarCell} />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const status = getStatusForDay(day);
              const isToday = day === now.getDate();
              return (
                <View key={day} style={[styles.calendarCell, isToday && { backgroundColor: colors.accentTint, borderRadius: 8 }]}>
                  <Text style={[styles.calendarDay, { color: isToday ? colors.accent : colors.textPrimary }]}>{day}</Text>
                  {status && <View style={[styles.statusDot, { backgroundColor: dotColor(status) }]} />}
                </View>
              );
            })}
          </View>
        </CardWrapper>

        {/* Today's Card */}
        <CardWrapper style={styles.todayCard}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Today</Text>
          <Text style={[styles.siteText, { color: colors.textSecondary }]}>
            📍 Ahmedabad Villa Project
          </Text>
          <Text style={[styles.shiftText, { color: colors.textSecondary }]}>
            ⏰ Shift: 8:00 AM – 5:00 PM
          </Text>
          <PrimaryButton
            title={checkedIn ? '✓ Check Out' : 'Check In'}
            onPress={() => setCheckedIn(!checkedIn)}
            style={styles.checkBtn}
          />
        </CardWrapper>

        {/* Summary */}
        <View style={styles.summaryRow}>
          <View style={[styles.summaryBox, { backgroundColor: colors.card }]}>
            <Text style={[styles.summaryNum, { color: colors.success }]}>{presentDays}</Text>
            <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Present</Text>
          </View>
          <View style={[styles.summaryBox, { backgroundColor: colors.card }]}>
            <Text style={[styles.summaryNum, { color: colors.error }]}>{absentDays}</Text>
            <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Absent</Text>
          </View>
          <View style={[styles.summaryBox, { backgroundColor: colors.card }]}>
            <Text style={[styles.summaryNum, { color: colors.warning }]}>{halfDays}</Text>
            <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Half Day</Text>
          </View>
        </View>

        {/* Recent Log */}
        <Text style={[styles.sectionTitle, { color: colors.textPrimary, marginLeft: 4 }]}>Recent Log</Text>
        {MOCK_ATTENDANCE.map((att) => (
          <View key={att.id} style={[styles.logItem, { backgroundColor: colors.card }]}>
            <View>
              <Text style={[styles.logDate, { color: colors.textPrimary }]}>{att.date}</Text>
              <Text style={[styles.logSite, { color: colors.textSecondary }]}>{att.site}</Text>
              <Text style={[styles.logInfo, { color: colors.textSecondary }]}>
                {att.hoursWorked}h worked • {att.contractor}
              </Text>
            </View>
            <StatusBadge status={att.status} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingBottom: 12,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3,
  },
  backBtn: { padding: 8 },
  headerTitle: { ...Typography.cardTitle, fontSize: 18 },
  scrollContent: { padding: 16, paddingBottom: 32 },
  calendarCard: { paddingTop: 20 },
  monthTitle: { ...Typography.cardTitle, textAlign: 'center', marginBottom: 12 },
  dayHeaders: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8 },
  dayHeader: { ...Typography.caption, width: 36, textAlign: 'center' },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  calendarCell: { width: '14.28%', alignItems: 'center', paddingVertical: 6 },
  calendarDay: { fontSize: 14, fontWeight: '500' },
  statusDot: { width: 6, height: 6, borderRadius: 3, marginTop: 2 },
  todayCard: { paddingTop: 20 },
  sectionTitle: { ...Typography.cardTitle, marginBottom: 8 },
  siteText: { ...Typography.body, marginBottom: 4 },
  shiftText: { ...Typography.body, marginBottom: 12 },
  checkBtn: { marginTop: 4 },
  summaryRow: { flexDirection: 'row', gap: 10, marginVertical: 16 },
  summaryBox: {
    flex: 1, alignItems: 'center', paddingVertical: 16, borderRadius: 12,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3,
  },
  summaryNum: { fontSize: 24, fontWeight: '700' },
  summaryLabel: { ...Typography.caption, marginTop: 4 },
  logItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 14, borderRadius: 12, marginBottom: 8,
    elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.03, shadowRadius: 2,
  },
  logDate: { ...Typography.cardTitle, fontSize: 14 },
  logSite: { ...Typography.caption, marginTop: 2 },
  logInfo: { fontSize: 11, marginTop: 2 },
});

export default AttendanceScreen;
