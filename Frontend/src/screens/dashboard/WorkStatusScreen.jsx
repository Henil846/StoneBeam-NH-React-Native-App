import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../../context/AppContext';
import CardWrapper from '../../components/common/CardWrapper';
import StatusBadge from '../../components/common/StatusBadge';
import { formatCurrency } from '../../constants/mockData';
import Typography from '../../constants/typography';

const TASKS = [
  { id: 't1', title: 'Foundation concrete pouring', completed: true },
  { id: 't2', title: 'Steel framework installation', completed: true },
  { id: 't3', title: 'Brick wall construction (Ground floor)', completed: false },
  { id: 't4', title: 'Electrical conduit laying', completed: false },
  { id: 't5', title: 'Plumbing pipe installation', completed: false },
];

const WEEKLY_EARNINGS = [
  { day: 'Mon', amount: 800 },
  { day: 'Tue', amount: 800 },
  { day: 'Wed', amount: 400 },
  { day: 'Thu', amount: 0 },
  { day: 'Fri', amount: 800 },
  { day: 'Sat', amount: 600 },
];

const PAYMENTS = [
  { id: 'p1', date: '2025-06-07', amount: 4800, status: 'Completed' },
  { id: 'p2', date: '2025-06-01', amount: 5600, status: 'Completed' },
  { id: 'p3', date: '2025-05-25', amount: 4000, status: 'Pending' },
];

const WorkStatusScreen = ({ navigation }) => {
  const { colors } = useApp();
  const insets = useSafeAreaInsets();

  const completedTasks = TASKS.filter((t) => t.completed).length;
  const progress = (completedTasks / TASKS.length) * 100;
  const maxEarning = Math.max(...WEEKLY_EARNINGS.map((e) => e.amount));

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={[styles.header, { paddingTop: insets.top + 10, backgroundColor: colors.card }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Work Status</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Active Work Card */}
        <CardWrapper style={styles.card}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Active Work</Text>
          <Text style={[styles.projectName, { color: colors.accent }]}>Ahmedabad Villa Project</Text>
          <View style={styles.infoRow}>
            <Text style={[styles.infoText, { color: colors.textSecondary }]}>Contractor: Arun Mehta</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoText, { color: colors.textSecondary }]}>Daily Rate: ₹800</Text>
            <Text style={[styles.infoText, { color: colors.textSecondary }]}>Started: June 1, 2025</Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={[styles.progressText, { color: colors.textPrimary }]}>Progress</Text>
              <Text style={[styles.progressPercent, { color: colors.accent }]}>{progress.toFixed(0)}%</Text>
            </View>
            <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
              <View style={[styles.progressFill, { backgroundColor: colors.accent, width: `${progress}%` }]} />
            </View>
          </View>
        </CardWrapper>

        {/* Task List */}
        <CardWrapper style={styles.card}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Tasks ({completedTasks}/{TASKS.length})</Text>
          {TASKS.map((task) => (
            <TouchableOpacity key={task.id} style={styles.taskItem} activeOpacity={0.7}>
              <MaterialCommunityIcons
                name={task.completed ? 'checkbox-marked' : 'checkbox-blank-outline'}
                size={24}
                color={task.completed ? colors.success : colors.border}
              />
              <Text
                style={[
                  styles.taskText,
                  { color: colors.textPrimary },
                  task.completed && { textDecorationLine: 'line-through', color: colors.textSecondary },
                ]}
              >
                {task.title}
              </Text>
            </TouchableOpacity>
          ))}
        </CardWrapper>

        {/* Weekly Earnings Chart */}
        <CardWrapper style={styles.card}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Weekly Earnings</Text>
          <View style={styles.chart}>
            {WEEKLY_EARNINGS.map((e) => (
              <View key={e.day} style={styles.barContainer}>
                <View style={[styles.bar, {
                  height: maxEarning > 0 ? (e.amount / maxEarning) * 100 : 0,
                  backgroundColor: e.amount > 0 ? colors.accent : colors.border,
                }]} />
                <Text style={[styles.barLabel, { color: colors.textSecondary }]}>{e.day}</Text>
                <Text style={[styles.barAmount, { color: colors.textSecondary }]}>₹{e.amount}</Text>
              </View>
            ))}
          </View>
        </CardWrapper>

        {/* Recent Payments */}
        <CardWrapper style={[styles.card, { marginBottom: 32 }]}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Recent Payments</Text>
          {PAYMENTS.map((pay) => (
            <View key={pay.id} style={styles.paymentItem}>
              <View>
                <Text style={[styles.payDate, { color: colors.textPrimary }]}>{pay.date}</Text>
                <Text style={[styles.payAmount, { color: colors.accent }]}>{formatCurrency(pay.amount)}</Text>
              </View>
              <StatusBadge status={pay.status} />
            </View>
          ))}
        </CardWrapper>
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
  card: { paddingTop: 20 },
  sectionTitle: { ...Typography.cardTitle, marginBottom: 12 },
  projectName: { ...Typography.sectionHeading, fontSize: 18, marginBottom: 8 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  infoText: { ...Typography.caption },
  progressContainer: { marginTop: 12 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progressText: { ...Typography.caption, fontWeight: '600' },
  progressPercent: { ...Typography.caption, fontWeight: '700' },
  progressBar: { height: 8, borderRadius: 4 },
  progressFill: { height: 8, borderRadius: 4 },
  taskItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8 },
  taskText: { ...Typography.body, flex: 1 },
  chart: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 140, paddingTop: 20 },
  barContainer: { alignItems: 'center', flex: 1, gap: 4 },
  bar: { width: 24, borderRadius: 4, minHeight: 4 },
  barLabel: { fontSize: 11, fontWeight: '500' },
  barAmount: { fontSize: 9 },
  paymentItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: 'rgba(255, 255, 255, 0.08)' },
  payDate: { ...Typography.caption },
  payAmount: { ...Typography.cardTitle, marginTop: 2 },
});

export default WorkStatusScreen;
