import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#4630EB',
  },
  buttonPressed: {
    backgroundColor: '#8630EB',
  },
  buttonText: {
    color: 'white',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  updateMessageText: {
    margin: 10,
    height: 200,
    paddingVertical: 12,
    paddingHorizontal: 32,
    width: '90%',
    borderColor: '#4630EB',
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 10,
  },
  logEntryText: {
    margin: 10,
    height: 200,
    paddingVertical: 12,
    paddingHorizontal: 32,
    width: '90%',
    borderColor: '#4630EB',
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 10,
  },
  monitorContainer: {
    height: 30,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  monitorModalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f6fe',
  },
  monitorModalTitle: {
    fontWeight: 'bold',
    margin: 20,
  },
  monitor: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#29ab50', // green
  },
  monitorUpdate: {
    backgroundColor: '#fce24c', // yellow
  },
  monitorCritical: {
    backgroundColor: '#db3421', // red
  },
});
