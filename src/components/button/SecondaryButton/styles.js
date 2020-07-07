import {colors, metrics} from '~/styles';
const gradientHeight = 500;
export const styles = {
  button: {
    backgroundColor: '#FFCD36',
    padding: metrics.basePadding + 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 7,
    shadowColor: colors.regular,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    elevation: 5,
  },
  buttonBorder: {
    borderColor: '#FFCD36',
    padding: metrics.basePadding + 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 7,
    borderWidth: 2,
    // shadowColor: colors.regular,
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 1,
    // elevation: 5
  },
  buttonDisabled: {
    backgroundColor: '#B1B4BE',
    padding: metrics.basePadding + 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 7,
    shadowColor: colors.regular,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    elevation: 5,
  },
  buttonDisabledBorder: {
    borderColor: '#B1B4BE',
    padding: metrics.basePadding + 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 7,
    shadowColor: colors.regular,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    elevation: 5,
  },
  buttonTxt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#48495A',
  },
  buttonTxtDisabled: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#707070',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
};
